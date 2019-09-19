module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoleActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: { type: Sequelize.STRING },
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
    return queryInterface.dropTable('RoleActions')
  }
}
