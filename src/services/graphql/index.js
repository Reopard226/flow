import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import request from 'request'
import Resolvers from './resolvers'
import Schema from './schema'
import user from './auth/user'
import admin from './auth/admin'
import Config from '../../config'

const config = Config()

export default (utils) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
    schemaDirectives: {
      user,
      admin
    }
  })

  const server = new ApolloServer({
    schema: executableSchema,
    context: async ({ req }) => {
      const authorization = req.headers.authorization
      if (typeof authorization !== 'undefined') {
        const { db } = utils
        const { User } = db.models
        const accessToken = authorization.replace('Bearer ', '')
        let user = await User.findOne({ where: { accessToken } })
        if (user) {
          return Object.assign({}, req, { user })
        }

        const options = {
          url: `https://${config.auth0.domain}/userinfo`,
          headers: {
            Authorization: authorization
          }
        }
        const res = await new Promise((resolve, reject) => {
          request(options, (err, res) => {
            if (err) {
              reject(err)
            }
            resolve(res.body)
          })
        })

        if (res === 'Unauthorized') {
          return req
        }

        try {
          const authUser = JSON.parse(res)
          const authId = authUser.sub.split('|')[1]
          user = await User.findOne({ where: { authId } })

          if (!user) {
            user = await User.create({
              name: authUser.name,
              displayName: authUser.nickname,
              avatar: authUser.picture,
              email: authUser.email,
              emailVerified: authUser.email_verified,
              authId
            })
          }
          return User.update({ accessToken: accessToken }, { where: { authId } }).then(updated => Object.assign({}, req, { user }))
        } catch (e) {
          console.log(e)
          return req
        }
      } else {
        return req
      }
    }
  })

  return server
}
