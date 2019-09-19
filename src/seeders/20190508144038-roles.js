module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      queryInterface.bulkInsert('Roles', [{
        name: 'account_owner',
        description: 'Account Owner',
        category: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, {
        name: 'account_admin',
        description: 'Account Admin',
        category: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, {
        name: 'team_member',
        description: 'Team Member',
        category: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, {
        name: 'distributed_admin',
        description: 'Admin',
        category: 'distributed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, {
        name: 'distributed_pm',
        description: 'Project Manager',
        category: 'distributed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, {
        name: 'distributed_sr',
        description: 'Sales Rep',
        category: 'distributed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }], {})
    } catch (e) {
      console.log('Already seeded')
    }
    return new Promise((resolve, reject) => resolve())
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
}
