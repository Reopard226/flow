module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING
  }, {})
  Role.associate = function (models) {
    Role.hasMany(models.RoleAction)
    Role.hasMany(models.Account)
  }
  return Role
}
