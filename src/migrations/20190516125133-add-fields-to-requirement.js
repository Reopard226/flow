module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Requirements', 'ProjectId', { type: Sequelize.INTEGER, references: { model: 'Projects', key: 'id' }, onDelete: 'cascade', onUpdate: 'cascade' }),
      queryInterface.addColumn('Requirements', 'userName', { type: Sequelize.STRING }),
      queryInterface.addColumn('Requirements', 'userCompany', { type: Sequelize.STRING }),
      queryInterface.addColumn('Requirements', 'userRole', { type: Sequelize.STRING }),
      queryInterface.addColumn('Requirements', 'userEmail', { type: Sequelize.STRING }),
      queryInterface.addColumn('Requirements', 'userPhone', { type: Sequelize.STRING }),
      queryInterface.addColumn('Requirements', 'slug', { type: Sequelize.STRING })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Requirements', 'ProjectId'),
      queryInterface.removeColumn('Requirements', 'userName'),
      queryInterface.removeColumn('Requirements', 'userCompany'),
      queryInterface.removeColumn('Requirements', 'userRole'),
      queryInterface.removeColumn('Requirements', 'userEmail'),
      queryInterface.removeColumn('Requirements', 'userPhone'),
      queryInterface.removeColumn('Requirements', 'slug')
    ])
  }
}
