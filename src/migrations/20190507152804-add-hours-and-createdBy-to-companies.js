module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Companies', 'hours', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Companies', 'createdBy', {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'createdBy'),
      queryInterface.removeColumn('Companies', 'hours')
    ])
  }
}
