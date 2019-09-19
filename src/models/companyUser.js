module.exports = (sequelize, DataTypes) => {
  const CompanyUser = sequelize.define('Company_User', {
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER
  }, {})
  return CompanyUser
}
