const typeDefinitions = `
  type Task {
    id: Int!
    title: String
    description: String
    startDate: String
    endDate: String
    status: Int
  }

  input TaskInput {
    title: String!
    description: String
    startDate: String
    endDate: String
    status: Int
  }
`

export default typeDefinitions
