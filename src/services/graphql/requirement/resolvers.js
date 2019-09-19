import jwt from 'jsonwebtoken'
import ManagementAPI from '../../auth0/managementApi'
import { sendNewUserEmail } from '../../aws/ses'
import Config from '../../../config'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

const config = Config()

export const requirementQuery = db => {
  const { Project, Requirement } = db.models

  return {
    requirement: async (root, { projectId }, context) => {
      return Project.findOne({ where: { id: projectId } }).then(project => project.getRequirement())
    },
    requirementBySlug: async (root, { slug }, context) => {
      return Requirement.findOne({ where: { slug } })
    }
  }
}

export const requirementMutation = db => {
  const { Requirement, Project, User, Company } = db.models

  return {
    createRequirement: async (root, { requirement }, context) => {
      const slug = `${Buffer.from(String(requirement.userEmail)).toString('base64').slice(0, 4)}${Buffer.from(String(Date.now())).toString('base64').replace(/=/g, '').slice(-4)}`

      return Requirement.create({
        ...requirement,
        slug
      }).then(req => req)
    },
    submitRequirement: async (root, { requirementId, requirement }, context) => {
      let req = null
      if (requirementId) {
        // if it's from anonymous customer, check if user info is already collected from step 1
        // and update the requirement with additional information
        req = await Requirement.findOne({ where: { id: requirementId } })

        if (!req) {
          throw new Error('Invalid Requirement')
        }

        req = await req.update({ ...requirement })
      } else if (context.user) {
        // if it's authenticated user trying to create new project,
        // just create new requirement and set the user
        const user = context.user
        const slug = `${Buffer.from(String(user.email)).toString('base64').slice(0, 4)}${Buffer.from(String(Date.now())).toString('base64').replace(/=/g, '').slice(-4)}`
        req = await Requirement.create({ ...requirement, slug })
        req.setUser(user)
      } else {
        throw new Error('Invalid request')
      }

      // check if the user is already created
      // if not, create new user
      let user = await req.getUser()
      if (!user) {
        const authUser = await ManagementAPI.createUser({
          email: req.userEmail,
          name: req.userName,
          password: requirement.password
        })
        if (authUser.statusCode) {
          throw new Error(authUser.message)
        }

        const accessToken = jwt.sign({ authId: authUser.identities[0].user_id }, config.auth0.clientSecret, { expiresIn: '1d' })
        user = await User.create({
          name: authUser.name,
          displayName: authUser.nickname,
          avatar: authUser.picture,
          email: authUser.email,
          emailVerified: authUser.email_verified,
          authId: authUser.identities[0].user_id,
          role: req.userRole,
          phone: req.userPhone,
          accessToken
        })
        req.setUser(user)
      }

      // check if the company is created
      // if not, create a company
      let companies = await user.getCompanies()
      let company = null
      if (!companies || companies.length === 0) {
        company = await Company.create({ name: req.userCompany })
        company.addUser(user)
      } else {
        company = companies[0]
      }

      const roles = await ManagementAPI.getRoles()
      const dstbtd = roles.filter(r => r.name === 'distributed_pm')
      let results = []
      for (let role of dstbtd) {
        const roleUsers = await ManagementAPI.getRoleUsers(role.id)
        const ids = roleUsers.map(u => u.user_id.split('|')[1])
        const users = await db.models.User.findAll({
          where: {
            authId: { [Op.in]: ids }
          }
        })
        results.push(...users)
      }

      const sam = results.find(r => r.name.indexOf('Sam') !== -1)

      // create a project
      const slug = `${Buffer.from(String(requirement.projectName)).toString('base64').slice(0, 4)}${Buffer.from(String(Date.now())).toString('base64').replace(/=/g, '').slice(-4)}`
      const project = await Project.create({
        title: requirement.projectName,
        status: 1,
        slug,
        projectManager: sam ? sam.id : null
      })
      project.setCompany(company)
      req.setProject(project)

      sendNewUserEmail(req)

      return {
        project,
        accessToken: user.accessToken
      }
    }
  }
}
