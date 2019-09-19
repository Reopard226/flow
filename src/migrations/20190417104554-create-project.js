module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      CompanyId: { type: Sequelize.INTEGER, references: { model: 'Companies', key: 'id' }, onDelete: 'cascade', onUpdate: 'cascade' },
      status: { type: Sequelize.INTEGER },
      startDate: { type: Sequelize.DATE },
      dueDate: { type: Sequelize.DATE },
      accountId: { type: Sequelize.INTEGER, references: { model: 'Accounts', key: 'id' }, onDelete: 'cascade', onUpdate: 'cascade' },
      hoursAllocated: { type: Sequelize.INTEGER },
      deliveredDate: { type: Sequelize.DATE },
      requirements: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects')
  }
}
