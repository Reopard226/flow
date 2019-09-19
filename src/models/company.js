module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    projectManager: DataTypes.INTEGER,
    salesRep: DataTypes.INTEGER,
    hours: DataTypes.INTEGER
  }, {})
  Company.associate = function (models) {
    // Company.belongsTo(models.Plan)
    // Company.hasMany(models.Account)
    Company.belongsToMany(models.User, { through: models.CompanyUser })
    Company.hasMany(models.Project)
  }
  return Company
}
