module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    authId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    email: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    accessToken: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // User.hasMany(models.Account)
    User.belongsToMany(models.Company, { through: models.CompanyUser })
  }
  return User
}
