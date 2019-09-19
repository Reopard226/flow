module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      DeliverableId: {
        type: Sequelize.INTEGER,
        references: { model: 'Deliverables', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks')
  }
}
