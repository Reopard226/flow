module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Roles', 'name', {
      type: Sequelize.STRING,
      unique: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Roles', 'name', {
      type: Sequelize.STRING
    })
  }
}
