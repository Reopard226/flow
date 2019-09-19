module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        unique: true
      }),
      queryInterface.addColumn('Users', 'emailVerified', { type: Sequelize.BOOLEAN })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'email'),
      queryInterface.removeColumn('Users', 'emailVerified')
    ])
  }
}
