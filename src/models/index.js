import Sequelize from 'sequelize'

// if (process.env.NODE_ENV === 'development') {
//   require('babel-plugin-require-context-hook/register')()
// }

export default (sequelize) => {
  let db = {}

  // const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
  // context.keys().map(context).forEach(module => {
  //   const model = module(sequelize, Sequelize)
  //   db[model.name] = model
  // })
  db['Package'] = require('./package')(sequelize, Sequelize)
  db['Plan'] = require('./plan')(sequelize, Sequelize)
  db['Company'] = require('./company')(sequelize, Sequelize)
  db['Role'] = require('./role')(sequelize, Sequelize)
  db['RoleAction'] = require('./roleaction')(sequelize, Sequelize)
  db['User'] = require('./user')(sequelize, Sequelize)
  db['Account'] = require('./account')(sequelize, Sequelize)
  db['Project'] = require('./project')(sequelize, Sequelize)
  db['Deliverable'] = require('./deliverable')(sequelize, Sequelize)
  db['Task'] = require('./task')(sequelize, Sequelize)
  db['TeamMember'] = require('./teammember')(sequelize, Sequelize)
  db['Assignment'] = require('./assignment')(sequelize, Sequelize)
  db['Status'] = require('./status')(sequelize, Sequelize)
  db['CompanyUser'] = require('./companyUser')(sequelize, Sequelize)
  db['Output'] = require('./output')(sequelize, Sequelize)
  db['Requirement'] = require('./requirement')(sequelize, Sequelize)

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  return db
}
