module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requirements', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    UserId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }, onDelete: 'cascade', onUpdate: 'cascade' },
    isSolutionInMind: { type: Sequelize.BOOLEAN },
    isNewOrExisting: { type: Sequelize.BOOLEAN },
    howFarThrough: { type: Sequelize.STRING },
    hasTeam: { type: Sequelize.BOOLEAN },
    hasExternalTeam: { type: Sequelize.BOOLEAN },
    hasInternalTeam: { type: Sequelize.BOOLEAN },
    justMe: { type: Sequelize.BOOLEAN },
    howManyExternalTeam: { type: Sequelize.INTEGER },
    externalTeamName: { type: Sequelize.STRING },
    projectName: { type: Sequelize.STRING },
    techStack: { type: Sequelize.STRING },
    hasDeadline: { type: Sequelize.BOOLEAN },
    deadline: { type: Sequelize.DATE },
    hasBudget: { type: Sequelize.BOOLEAN },
    budget: { type: Sequelize.STRING },
    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE }
  }),
  down: queryInterface => queryInterface.dropTable('Requirements')
}
