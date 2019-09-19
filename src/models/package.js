module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    hours: DataTypes.INTEGER
  }, {})
  Package.associate = function (models) {
    Package.belongsToMany(models.Plan, { through: 'Plans_Packages' })
  }
  return Package
}
