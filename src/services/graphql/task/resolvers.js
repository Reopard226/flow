export const taskQuery = (db) => {
  const { Deliverable } = db.models
  return {
    tasks: async (root, { deliverableId }, context) => {
      return Deliverable.findOne({ where: { id: deliverableId } })
        .then(d => d.getTasks())
    }
  }
}

export const taskMutation = (db) => {
  const { Task, Deliverable } = db.models

  return {
    createTask: async (root, { deliverableId, task }, context) => {
      const deliverable = await Deliverable.findOne({ where: { id: deliverableId } })

      if (!deliverable) {
        throw Error('Invalid Deliverable')
      }

      return Task.create({
        ...task
      }).then(t => {
        t.setDeliverable(deliverable)
        return t
      })
    },
    updateTask: async (root, { taskId, task }, context) => {
      return Task.update({
        ...task
      }, {
        where: { id: taskId }
      }).then(updated => Task.findOne({
        where: { id: taskId }
      }))
    },
    deleteTask: async (root, { taskId }, context) => {
      const task = await Task.findOne({
        where: { id: taskId }
      })
      if (!task) {
        return 0
      }

      await task.destroy()
      return 1
    }
  }
}
