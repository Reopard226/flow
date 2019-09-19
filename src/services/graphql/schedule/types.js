const typeDefinitions = `
  input ScheduleInput {
    date: String!
    time: String!
    callType: String!
  }

  type Schedule {
    date: String
    time: String
    callType: String
  }
`
export default typeDefinitions
