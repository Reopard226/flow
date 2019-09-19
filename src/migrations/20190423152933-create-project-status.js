module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project_Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
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
    return queryInterface.dropTable('Project_Statuses')
  }
}
