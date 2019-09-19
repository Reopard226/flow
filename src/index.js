import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import { createServer } from 'http'
import servicesLoader from './services'
import db from './database'

const utils = {
  db
}
const services = servicesLoader(utils)

const app = express()

app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(compress())
app.use(cors())

const server = createServer(app)

const serviceNames = Object.keys(services)
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i]
  switch (name) {
    case 'graphql':
      services[name].applyMiddleware({ app })
      break
    case 'subscriptions':
      server.listen(8000, () => {
        console.log('Listening on port 8000!')
        services[name](server)
      })
      break
    default:
      app.use(`/${name}`, services[name])
      break
  }
}

app.get('*', (req, res) => res.send('Hello World!'))
