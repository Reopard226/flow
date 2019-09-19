const typeDefinitions = `
  type Deliverable {
    id: Int!
    title: String
    description: String
    outputs: [Output]
    tasks: [Task]
  }

  input DeliverableInput {
    title: String!
    description: String
  }
`

export default typeDefinitions
