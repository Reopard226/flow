module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {})
  Plan.associate = function (models) {
    // Plan.hasMany(models.Company)
    Plan.belongsToMany(models.Package, { through: 'Plans_Packages' })
  }
  return Plan
}
