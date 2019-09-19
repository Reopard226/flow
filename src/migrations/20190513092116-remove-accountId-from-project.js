module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Projects', 'accountId')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Projects', 'accountId', {
      type: Sequelize.INTEGER,
      references: { model: 'Accounts', key: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }
}
