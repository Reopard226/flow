const typeDefinitions = `
  type Project {
    id: Int!
    title: String!
    status: Int
    projectManager: Int
    startDate: String
    dueDate: String
    hoursAllocated: Int
    deliveredDate: String
    slug: String
    beDevs: Int
    feDevs: Int
    uiDevs: Int
    specialists: Int
    reportLink: String
    requirement: Requirement
    deliverables: [Deliverable]
    createdAt: String
    updatedAt: String
  }

  input ProjectInput {
    title: String!
    status: Int
    projectManager: Int
    startDate: String
    dueDate: String
    hoursAllocated: Int
    deliveredDate: String
    beDevs: Int
    feDevs: Int
    uiDevs: Int
    specialists: Int
    reportLink: String
  }
`

export default typeDefinitions
