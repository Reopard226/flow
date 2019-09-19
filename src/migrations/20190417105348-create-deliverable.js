module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Deliverables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      hoursAllocated: { type: Sequelize.INTEGER },
      progress: { type: Sequelize.INTEGER },
      ProjectId: {
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
    return queryInterface.dropTable('Deliverables')
  }
}
