import Sequelize from 'sequelize'
import Config from '../config'
import models from '../models'

const config = Config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
  models: models(sequelize),
  sequelize
}

export default db
