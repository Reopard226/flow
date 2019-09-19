module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Companies', 'salesRep', { type: Sequelize.INTEGER })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'salesRep')
    ])
  }
}
