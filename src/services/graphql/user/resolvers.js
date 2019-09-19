import ManagementAPI from '../../auth0/managementApi'

export const userType = {
  User: {
    company (user) {
      return user.getCompanies().then(companies => companies[0])
    }
  }
}

export const userQuery = (db) => {
  const { Company } = db.models
  return {
    currentUser: async (root, args, context) => {
      const user = context.user

      // get user's company. if a user does not belong to any company,
      // assign the user to Distributed
      let companies = await user.getCompanies()
      let company = null
      if (!companies || companies.length === 0) {
        company = await Company.findOne({ where: { id: 1 } })
        company.addUser(user)
      } else {
        company = companies[0]
      }

      return user
    }
  }
}

export const userMutation = (db) => {
  const { User } = db.models

  return {
    updateProfile: async (root, { userId, data }, context) => {
      const user = context.user

      if (user.id !== userId) {
        throw new Error('You are not authorized to perform this action')
      }

      if (data.password) {
        const res = await ManagementAPI.updateUser(user.authId, { password: data.password })
        if (res.statusCode) {
          throw new Error(res.message)
        }
      }

      if (data.email) {
        const res = await ManagementAPI.updateUser(user.authId, { email: data.email })
        if (res.statusCode) {
          throw new Error(res.message)
        }
      }

      return User.update({
        ...data
      }, {
        where: { id: userId }
      }).then(u => User.findOne({
        where: { id: userId }
      }))
    }
  }
}
