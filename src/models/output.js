module.exports = (sequelize, DataTypes) => {
  const Output = sequelize.define('Output', {
    title: DataTypes.STRING,
    href: DataTypes.STRING
  }, {})
  Output.associate = function (models) {
    Output.belongsTo(models.Deliverable)
  }
  return Output
}
