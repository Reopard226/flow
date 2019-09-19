import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
import ManagementAPI from '../../auth0/managementApi'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const ctx = args[2]
      if (ctx.user) {
        const userId = `auth0|${ctx.user.authId}`
        const roles = await ManagementAPI.getUserRole(userId)

        if (roles.filter(role => role.name === 'distributed_admin' || role.name === 'distributed_pm').length !== 0) {
          const res = await resolve.apply(this, args)
          return res
        } else {
          throw new AuthenticationError('You are not authorized for this request')
        }
      } else {
        throw new AuthenticationError('You need to be logged in.')
      }
    }
  }
}

export default AuthDirective
