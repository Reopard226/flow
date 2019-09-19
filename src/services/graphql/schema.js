import projectDefinitions from './project/types'
import companyDefinitions from './company/types'
import deliverableDefinitions from './deliverable/types'
import taskDefinitions from './task/types'
import outputDefinitions from './output/types'
import requirementDefinitions from './requirement/types'
import userDefinitions from './user/types'
import scheduleDefinitions from './schedule/types'

const typeDefinitions = `
  directive @user on QUERY | FIELD_DEFINITION | FIELD
  directive @admin on QUERY | FIELD_DEFINITION | FIELD

  scalar Date

  type RootQuery {
    currentUser: User @user

    projects ( companyId: Int ): [Project] @user
    projectBySlug ( slug: String! ): Project @user

    deliverables ( projectId: Int! ): [Deliverable] @user
    tasks ( deliverableId: Int! ): [Task] @user
    outputs ( deliverableId: Int!): [Output] @user
    companies: [Company] @admin
    dstbtdUsers: MetaUsers @user
    requirement ( projectId: Int! ): Requirement @admin
    
    requirementBySlug ( slug: String! ): Requirement
  }

  type RootMutation {
    createCompany ( company: CompanyInput! ): Company @admin
    updateCompany ( id: Int!, company: CompanyInput! ): Company @admin
    deleteCompany ( id: Int! ): Int @admin

    createCompanyUser ( companyId: Int!, user: CompanyUserInput! ): CompanyUser @admin
    updateCompanyUser ( userId: Int!, user: CompanyUserInput! ): CompanyUser @admin
    deleteCompanyUser ( userId: Int! ): Int @admin

    createProject ( companyId: Int!, project: ProjectInput! ): Project @admin
    updateProject ( projectId: Int!, project: ProjectInput! ): Project @admin
    deleteProject ( projectId: Int! ): Int @admin
    startProject ( projectId: Int! ): Project @user
    signOff (projectId: Int!): Project @user

    createDeliverable ( projectId: Int!, deliverable: DeliverableInput! ): Deliverable @admin
    updateDeliverable ( deliverableId: Int!, deliverable: DeliverableInput! ): Deliverable @admin
    deleteDeliverable ( deliverableId: Int! ): Int @admin

    createTask ( deliverableId: Int!, task: TaskInput! ): Task @admin
    updateTask ( taskId: Int!, task: TaskInput! ): Task @admin
    deleteTask ( taskId: Int! ): Int @admin

    createOutput ( deliverableId: Int!, output: OutputInput! ): Output @admin
    updateOutput ( outputId: Int!, output: OutputInput! ): Output @admin
    deleteOutput ( outputId: Int! ): Int @admin

    createRequirement ( requirement: RequirementsUserInput! ): Requirement
    submitRequirement ( requirementId: Int, requirement: RequirementsInput! ): RequirementResult

    updateProfile ( userId: Int!, data: CompanyUserInput! ): User @user

    createSchedule ( data: ScheduleInput! ): Schedule @user
  }

  type RootSubscription {
    projectChanged: Project
  }

  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }
`

export default [
  typeDefinitions,
  companyDefinitions,
  projectDefinitions,
  deliverableDefinitions,
  taskDefinitions,
  outputDefinitions,
  requirementDefinitions,
  userDefinitions,
  scheduleDefinitions
]
