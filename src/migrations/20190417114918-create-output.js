module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Outputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { type: Sequelize.STRING },
      href: { type: Sequelize.STRING },
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
    return queryInterface.dropTable('Outputs')
  }
}
