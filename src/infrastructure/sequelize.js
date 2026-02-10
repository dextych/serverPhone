import { Sequelize } from 'sequelize';
import { db } from '../../config/config.js';

// Создание экземпляра Sequelize
const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    port: db.port,
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