module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'planId')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Companies', 'planId', {
      type: Sequelize.INTEGER,
      references: { model: 'Plans', key: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }
}
