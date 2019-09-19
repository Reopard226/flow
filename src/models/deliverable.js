module.exports = (sequelize, DataTypes) => {
  const Deliverable = sequelize.define('Deliverable', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    progress: DataTypes.INTEGER
  }, {})
  Deliverable.associate = function (models) {
    Deliverable.belongsTo(models.Project)
    Deliverable.hasMany(models.Task)
    Deliverable.hasMany(models.Output)
  }
  return Deliverable
}
