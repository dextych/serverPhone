import { Sequelize } from 'sequelize';
import { config } from '../../config/config.js';

// Создание экземпляра Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
      supportBigNumbers: true
    }
  }
);

export default sequelize;