module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Projects', 'slug', { type: Sequelize.STRING }),
      queryInterface.addColumn('Projects', 'beDevs', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Projects', 'feDevs', { type: Sequelize.INTEGER }),
      queryInterface.addColumn('Projects', 'uiDevs', { type: Sequelize.INTEGER })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Projects', 'slug'),
      queryInterface.removeColumn('Projects', 'beDevs'),
      queryInterface.removeColumn('Projects', 'feDevs'),
      queryInterface.removeColumn('Projects', 'uiDevs')
    ])
  }
}
