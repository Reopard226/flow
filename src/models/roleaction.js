module.exports = (sequelize, DataTypes) => {
  const RoleAction = sequelize.define('RoleAction', {
    action: DataTypes.STRING
  }, {})
  RoleAction.associate = function (models) {
    RoleAction.belongsTo(models.Role)
  }
  return RoleAction
}
