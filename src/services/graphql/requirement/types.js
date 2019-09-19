const typeDefinitions = `
  type Requirement {
    id: Int!
    userName: String
    userCompany: String
    userRole: String
    userEmail: String
    userPhone: String
    slug: String
    isSolutionInMind: Boolean
    isNewOrExisting: Boolean
    howFarThrough: String
    hasTeam: Boolean
    hasExternalTeam: Boolean
    hasInternalTeam: Boolean
    justMe: Boolean
    howManyExternalTeam: Int
    externalTeamName: String
    projectName: String
    techStack: String
    hasDeadline: Boolean
    deadline: String
    hasBudget: Boolean
    budget: String
  }

  type RequirementResult {
    project: Project!,
    accessToken: String
  }

  input RequirementsUserInput {
    userName: String
    userCompany: String
    userRole: String
    userEmail: String!
    userPhone: String
  }

  input RequirementsInput {
    isSolutionInMind: Boolean
    isNewOrExisting: Boolean
    howFarThrough: String
    hasTeam: Boolean
    hasExternalTeam: Boolean
    hasInternalTeam: Boolean
    justMe: Boolean
    howManyExternalTeam: Int
    externalTeamName: String
    projectName: String
    techStack: String
    hasDeadline: Boolean
    deadline: String
    hasBudget: Boolean
    budget: String
    password: String
  }
`

export default typeDefinitions
