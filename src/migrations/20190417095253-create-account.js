module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: { model: 'Companies', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts')
  }
}
