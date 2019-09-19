export const deliverableType = {
  Deliverable: {
    outputs (deliverable) {
      return deliverable.getOutputs()
    },
    tasks (deliverable) {
      return deliverable.getTasks()
    }
  }
}

export const deliverableQuery = (db) => {
  const { Project } = db.models
  return {
    deliverables: async (root, { projectId }, context) => {
      return Project.findOne({ where: { id: projectId } })
        .then(project => project.getDeliverables())
    }
  }
}

export const deliverableMutation = (db) => {
  const { Project, Deliverable } = db.models

  return {
    createDeliverable: async (root, { projectId, deliverable }, context) => {
      const project = await Project.findOne({ where: { id: projectId } })

      if (!project) {
        throw Error('Invalid Project')
      }

      return Deliverable.create({
        ...deliverable
      }).then(d => {
        d.setProject(project)
        return d
      })
    },
    updateDeliverable: async (root, { deliverableId, deliverable }, context) => {
      return Deliverable.update({
        ...deliverable
      }, {
        where: { id: deliverableId }
      }).then(updated => Deliverable.findOne({
        where: { id: deliverableId }
      }))
    },
    deleteDeliverable: async (root, { deliverableId }, context) => {
      const deliverable = await Deliverable.findOne({
        where: { id: deliverableId }
      })
      if (!deliverable) {
        return 0
      }
      const tasks = await deliverable.getTasks()
      if (tasks.length > 0) {
        throw Error('Deliverable has tasks. Please delete tasks first')
      }

      const outputs = await deliverable.getOutputs()
      if (outputs.length > 0) {
        throw Error('Deliverable has outputs. Please delete outputs first')
      }

      await deliverable.destroy()
      return 1
    }
  }
}
