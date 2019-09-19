module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
    slug: DataTypes.STRING,
    userName: DataTypes.STRING,
    userCompany: DataTypes.STRING,
    userRole: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPhone: DataTypes.STRING,
    isSolutionInMind: DataTypes.BOOLEAN,
    isNewOrExisting: DataTypes.BOOLEAN,
    howFarThrough: DataTypes.BOOLEAN,
    hasTeam: DataTypes.BOOLEAN,
    hasExternalTeam: DataTypes.BOOLEAN,
    hasInternalTeam: DataTypes.BOOLEAN,
    justMe: DataTypes.BOOLEAN,
    howManyExternalTeam: DataTypes.INTEGER,
    externalTeamName: DataTypes.STRING,
    projectName: DataTypes.STRING,
    techStack: DataTypes.TEXT,
    hasDeadline: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE,
    hasBudget: DataTypes.BOOLEAN,
    budget: DataTypes.STRING
  }, {})
  Requirement.associate = function (models) {
    Requirement.belongsTo(models.User)
    Requirement.belongsTo(models.Project)
  }
  return Requirement
}
