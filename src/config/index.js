const config = {
  db: {
    username: process.env.CLICK_DBUSER,
    password: process.env.CLICK_DBPASS,
    database: process.env.CLICK_DBNAME,
    host: process.env.CLICK_DBHOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  auth0: {
    domain: process.env.Auth0Domain,
    clientId: process.env.Auth0ClientId,
    clientSecret: process.env.Auth0ClientSecret,
    scope: 'read:users'
  }
}

module.exports = () => {
  return Object.assign({}, config.db, { auth0: config.auth0 })
}
