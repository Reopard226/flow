const typeDefinitions = `
  type CompanyUser {
    id: Int!
    name: String!
    email: String!
    role: String
    phone: String
    avatar: String
  }

  type MetaUsers {
    distributed_pm: [CompanyUser]
    distributed_sr: [CompanyUser]
  }

  type Company {
    id: Int!
    name: String
    hours: Int
    projectManager: Int
    salesRep: Int
    users: [CompanyUser]
  }

  input CompanyInput {
    name: String!
    projectManager: Int
    salesRep: Int
    hours: Int
  }

  input CompanyUserInput {
    name: String!
    email: String!
    role: String
    phone: String
    password: String
  }
`

export default typeDefinitions
