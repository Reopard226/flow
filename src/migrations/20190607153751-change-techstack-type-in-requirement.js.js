module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Requirements', 'techStack', { type: Sequelize.TEXT })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Requirements', 'techStack', { type: Sequelize.STRING })
    ])
  }
}
