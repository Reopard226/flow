module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
  }, {})
  TeamMember.associate = function (models) {
    TeamMember.belongsTo(models.Account)
    TeamMember.belongsTo(models.Project)
    TeamMember.hasMany(models.Assignment)
  }
  return TeamMember
}
