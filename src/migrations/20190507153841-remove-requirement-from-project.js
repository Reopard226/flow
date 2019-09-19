module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Projects', 'requirements')
  },

  down: (queryInterface, Sequelize) => queryInterface.addColumn('Projects', 'requirements', { type: Sequelize.TEXT })
}
