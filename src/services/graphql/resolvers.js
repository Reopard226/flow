import { PubSub } from 'graphql-subscriptions'
import DataTypes from './dataTypes'
import { projectType, projectQuery, projectMutation, projectSubscription } from './project/resolvers'
import { companyType, companyQuery, companyMutation } from './company/resolvers'
import { deliverableType, deliverableQuery, deliverableMutation } from './deliverable/resolvers'
import { taskQuery, taskMutation } from './task/resolvers'
import { outputQuery, outputMutation } from './output/resolvers'
import { requirementQuery, requirementMutation } from './requirement/resolvers'
import { userType, userQuery, userMutation } from './user/resolvers'
import { scheduleMutation } from './schedule/resolvers'

const pubsub = new PubSub()

export default function resolver () {
  const { db } = this

  const resolvers = {
    ...DataTypes,
    ...companyType,
    ...deliverableType,
    ...projectType,
    ...userType,
    RootQuery: {
      ...companyQuery(db),
      ...projectQuery(db),
      ...deliverableQuery(db),
      ...taskQuery(db),
      ...outputQuery(db),
      ...requirementQuery(db),
      ...userQuery(db)
    },
    RootMutation: {
      ...companyMutation(db),
      ...projectMutation(db, pubsub),
      ...deliverableMutation(db),
      ...taskMutation(db),
      ...outputMutation(db),
      ...requirementMutation(db),
      ...userMutation(db),
      ...scheduleMutation(db)
    },
    RootSubscription: {
      ...projectSubscription(pubsub)
    }
  }

  return resolvers
}
