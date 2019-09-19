import { makeExecutableSchema } from 'graphql-tools'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import Resolvers from '../graphql/resolvers'
import Schema from '../graphql/schema'
import auth from '../graphql/auth/user'

export default (utils) => (server) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
    schemaDirectives: {
      auth: auth
    }
  })
  const subServer = new SubscriptionServer({
    execute,
    subscribe,
    schema: executableSchema
  }, {
    server,
    path: '/subscriptions'
  })
  subServer.onConnect = () => console.log('websocket connected')
}
