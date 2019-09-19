module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TeamMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: { model: 'Accounts', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Assignments')
  }
}
