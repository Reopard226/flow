import ManagementAPI from '../../auth0/managementApi'

const status = {
  more_info_required: 1,
  gen_quote: 2,
  ready_to_start: 3,
  on_track: 4,
  action_required: 5,
  completed: 6,
  signed_off: 7
}

export const projectType = {
  Project: {
    requirement (project) {
      return project.getRequirement()
    },
    deliverables (project) {
      return project.getDeliverables()
    }
  }
}

export const projectQuery = db => {
  const { Company, Project, User } = db.models
  return {
    projects: async (root, { companyId }, context) => {
      if (companyId) {
        const company = await Company.findOne({ where: { id: companyId } })
        if (company) {
          const projects = await company.getProjects()
          return projects
        }
        return []
      }
      const authId = `auth0|${context.user.authId}`
      const roles = await ManagementAPI.getUserRole(authId)
      if (roles.statusCode) {
        throw new Error(roles.message)
      }

      if (roles.filter(role => role.name === 'distributed_admin').length !== 0) {
        return Project.findAll()
      }

      const user = await User.findOne({ where: { authId: context.user.authId } })
      const companies = await user.getCompanies()
      return companies.reduce(async (acc, cur) => {
        const projects = await cur.getProjects()
        acc.push(...projects)
        return acc
      }, [])
    },
    projectBySlug: async (root, { slug }, context) => {
      return Project.findOne({ where: { slug } })
    }
  }
}

export const projectMutation = (db, pubsub) => {
  const { Project, Company } = db.models
  return {
    createProject: async (root, { companyId, project }, context) => {
      const company = await Company.findOne({ where: { id: companyId } })
      const slug = `${Buffer.from(String(project.title)).toString('base64').slice(0, 4)}${Buffer.from(String(Date.now())).toString('base64').replace(/=/g, '').slice(-4)}`

      const defaultStatus = project.status || status.more_info_required

      return Project.create({
        ...project,
        status: defaultStatus,
        slug
      }).then(newProject => {
        newProject.setCompany(company)
        return newProject
      })
    },
    updateProject: async (root, { projectId, project }, context) => {
      await Project.update({ ...project }, { where: { id: projectId } })
      const updated = Project.findOne({ where: { id: projectId } })

      pubsub.publish('projectChanged', { projectChanged: updated })

      return updated
    },
    deleteProject: async (root, { projectId }, context) => {
      const project = await Project.findOne({
        where: { id: projectId }
      })
      if (!project) {
        return 0
      }
      const deliverables = await project.getDeliverables()
      if (deliverables.length > 0) {
        throw Error('Project has deliverables. Please delete deliverables first')
      }
      await project.destroy()
      return 1
    },
    startProject: async (root, { projectId }, context) => {
      const user = context.user
      if (!user) {
        throw new Error('Invalid User')
      }

      const project = await Project.findOne({ where: { id: projectId } })
      if (!project) {
        throw new Error('Invalid Project')
      }

      const company = await project.getCompany()
      const companies = await user.getCompanies()
      if (companies.filter(c => c.id === company.id).length === 0) {
        throw new Error('You are not authorized')
      }

      if (company.hours < project.hoursAllocated) {
        return new Error('Insufficient hours')
      }

      const newHours = company.hours - project.hoursAllocated
      await company.update({ hours: newHours })

      return Project.update({
        status: status.on_track,
        startDate: new Date().toISOString()
      }, {
        where: { id: projectId }
      }).then(() => Project.findOne({
        where: { id: projectId }
      }))
    },
    signOff: async (root, { projectId }, context) => {
      const user = context.user
      if (!user) {
        throw new Error('Invalid User')
      }

      const project = await Project.findOne({ where: { id: projectId } })
      if (!project) {
        throw new Error('Invalid Project')
      }

      const company = await project.getCompany()
      const companies = await user.getCompanies()
      if (companies.filter(c => c.id === company.id).length === 0) {
        throw new Error('You are not authorized')
      }

      return Project.update({
        status: status.signed_off
      }, {
        where: { id: projectId }
      }).then(() => Project.findOne({
        where: { id: projectId }
      }))
    }
  }
}

export const projectSubscription = pubsub => {
  return {
    projectChanged: {
      subscribe: () => pubsub.asyncIterator(['projectChanged'])
    }
  }
}
