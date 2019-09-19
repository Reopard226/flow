module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Task_Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TaskId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tasks', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: { model: 'Statuses', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Task_Statuses')
  }
}
