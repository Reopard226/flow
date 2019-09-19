module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Deliverables', 'hoursAllocated')
  },

  down: (queryInterface, Sequelize) => queryInterface.addColumn('Deliverables', 'hoursAllocated', { type: Sequelize.INTEGER })
}
