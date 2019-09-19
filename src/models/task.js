module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {})
  Task.associate = function (models) {
    // Task.belongsTo(models.Project)
    Task.belongsTo(models.Deliverable)
    // Task.hasMany(models.Assignment)
    // Task.belongsToMany(models.Status, { through: 'Task_Statuses' })
  }
  return Task
}
