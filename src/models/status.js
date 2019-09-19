module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    description: DataTypes.STRING,
    order: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {})
  Status.associate = function (models) {
    // Status.belongsToMany(models.Project, { through: 'Project_Statuses' })
    // Status.belongsToMany(models.Task, { through: 'Task_Statuses' })
  }
  return Status
}
