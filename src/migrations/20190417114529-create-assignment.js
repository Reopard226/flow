module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hoursSpent: { type: Sequelize.INTEGER },
      memberId: {
        type: Sequelize.INTEGER,
        references: { model: 'TeamMembers', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tasks', key: 'id' },
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
