module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Plans_Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planId: {
        type: Sequelize.INTEGER,
        references: { model: 'Plans', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      packageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Packages', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Plans_Packages')
  }
}
