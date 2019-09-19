module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Company_Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        references: { model: 'Companies', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Company_Users')
  }
}
