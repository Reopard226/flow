import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const ctx = args[2]
      if (ctx.user) {
        const res = await resolve.apply(this, args)
        return res
      } else {
        throw new AuthenticationError('You need to be logged in.')
      }
    }
  }
}

export default AuthDirective
