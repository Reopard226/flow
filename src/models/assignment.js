module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    hoursSpent: DataTypes.INTEGER
  }, {})
  Assignment.associate = function (models) {
    Assignment.belongsTo(models.TeamMember)
    Assignment.belongsTo(models.Task)
  }
  return Assignment
}
