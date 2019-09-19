module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks', 'projectId')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'projectId', {
      type: Sequelize.INTEGER,
      references: { model: 'Projects', key: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }
}
