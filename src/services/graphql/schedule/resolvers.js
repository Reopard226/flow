import { sendScheduleNotification } from '../../aws/ses'

export const scheduleMutation = db => {
  return {
    createSchedule: async (root, { data }, context) => {
      const username = context.user.name
      const companies = await context.user.getCompanies()
      const company = companies.length > 0 ? companies[0].name : ''
      sendScheduleNotification(Object.assign({}, data, { username, company, date: data.date.split('T')[0] }))
      return data
    }
  }
}
