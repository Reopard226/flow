module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
  }, {})
  Account.associate = function (models) {
    Account.belongsTo(models.Company)
    // Account.belongsTo(models.User)
    Account.belongsTo(models.Role)
    // Account.hasMany(models.Project)
    Account.hasMany(models.TeamMember)
  }
  return Account
}
