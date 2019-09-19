export const outputQuery = (db) => {
  const { Deliverable } = db.models
  return {
    outputs: async (root, { deliverableId }, context) => {
      return Deliverable.findOne({ where: { id: deliverableId } })
        .then(deliverable => deliverable.getOutputs())
    }
  }
}

export const outputMutation = (db) => {
  const { Output, Deliverable } = db.models

  return {
    createOutput: async (root, { deliverableId, output }, context) => {
      const deliverable = await Deliverable.findOne({ where: { id: deliverableId } })

      if (!deliverable) {
        throw Error('Invalid Deliverable')
      }

      return Output.create({
        ...output
      }).then(o => {
        o.setDeliverable(deliverable)
        return o
      })
    },
    updateOutput: async (root, { outputId, output }, context) => {
      return Output.update({
        ...output
      }, {
        where: { id: outputId }
      }).then(updated => Output.findOne({
        where: { id: outputId }
      }))
    },
    deleteOutput: async (root, { outputId }, context) => {
      const output = await Output.findOne({
        where: { id: outputId }
      })
      if (!output) {
        return 0
      }

      await output.destroy()
      return 1
    }
  }
}
