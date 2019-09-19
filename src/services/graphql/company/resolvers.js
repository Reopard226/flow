import ManagementAPI from '../../auth0/managementApi'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

export const companyType = {
  Company: {
    users (company) {
      return company.getUsers()
    }
  }
}

export const companyQuery = (db) => ({
  companies: async (root, args, context) => {
    return db.models.Company.findAll({
      order: [
        ['createdAt', 'ASC']
      ]
    })
  },
  dstbtdUsers: async (root, args, context) => {
    const roles = await ManagementAPI.getRoles()
    const dstbtd = roles.filter(r => r.name === 'distributed_pm' || r.name === 'distributed_sr')
    let results = {}
    for (let role of dstbtd) {
      const roleUsers = await ManagementAPI.getRoleUsers(role.id)
      const ids = roleUsers.map(u => u.user_id.split('|')[1])
      const users = await db.models.User.findAll({
        where: {
          authId: { [Op.in]: ids }
        }
      })
      results[role.name] = users
    }
    return results
  }
})

export const companyMutation = (db) => {
  const { Company, User } = db.models

  return {
    createCompany: async (root, { company }, context) => {
      return Company.create({
        ...company,
        hours: 0
      }).then(newCompany => newCompany)
    },
    updateCompany: async (root, { id, company }, context) => {
      return Company.update({
        ...company
      }, {
        where: { id }
      }).then(updated => Company.findOne({
        where: { id }
      }))
    },
    deleteCompany: async (root, { id }, context) => {
      const company = await Company.findOne({
        where: { id }
      })
      if (!company) {
        return 0
      }
      const users = await company.getUsers()
      if (users.length > 0) {
        throw Error('Company has users. Please delete users first')
      }
      const projects = await company.getProjects()
      if (projects.length > 0) {
        throw Error('Company has projects. Please delete projects first')
      }
      await company.destroy()
      return 1
    },
    createCompanyUser: async (root, { companyId, user }, context) => {
      const company = await Company.findOne({
        where: { id: companyId }
      })

      if (!company) {
        throw Error('Invalid Company')
      }

      const authUser = await ManagementAPI.createUser(user)
      if (authUser.statusCode) {
        throw new Error(authUser.message)
      }

      const createdUser = await User.create({
        name: authUser.name,
        displayName: authUser.nickname,
        avatar: authUser.picture,
        email: authUser.email,
        emailVerified: authUser.email_verified,
        authId: authUser.identities[0].user_id,
        role: user.role,
        phone: user.phone
      })
      company.addUser(createdUser)

      return createdUser
    },
    updateCompanyUser: async (root, { userId, user }, context) => {
      return User.update({
        ...user
      }, {
        where: { id: userId }
      }).then(updated => User.findOne({
        where: { id: userId }
      }))
    },
    deleteCompanyUser: async (root, { userId }, context) => {
      const user = await User.findOne({
        where: { id: userId }
      })
      if (!user) {
        return 0
      }

      const res = await ManagementAPI.deleteUser(user.authId)
      if (res !== 204 && res.statusCode) {
        return new Error(res.message)
      }

      await user.destroy()
      return 1
    }
  }
}
