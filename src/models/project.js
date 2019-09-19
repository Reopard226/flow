module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    hoursAllocated: DataTypes.INTEGER,
    deliveredDate: DataTypes.DATE,
    status: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    beDevs: DataTypes.INTEGER,
    feDevs: DataTypes.INTEGER,
    uiDevs: DataTypes.INTEGER,
    specialists: DataTypes.INTEGER,
    projectManager: DataTypes.INTEGER,
    reportLink: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {})
  Project.associate = function (models) {
    Project.belongsTo(models.Company)
    // Project.belongsTo(models.Account)
    Project.hasMany(models.Deliverable)
    Project.hasOne(models.Requirement)
    // Project.hasMany(models.TeamMember)
    // Project.belongsToMany(models.Status, { through: 'Project_Statuses' })
  }
  return Project
}
