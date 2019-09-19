const typeDefinitions = `
  type User {
    id: Int!
    authId: String!
    name: String!
    displayName: String!
    email: String!
    phone: String
    role: String
    avatar: String
    company: Company
  }
`

export default typeDefinitions
