import { DataTypes } from 'sequelize';
import sequelize from '../infrastructure/sequelize.js';

const Case = sequelize.define('Case', {
  guid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false
  },

  mimeType: {
    type: DataTypes.STRING,
    allowNull: false
  },

  width: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  height: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

//   // Поворот чехла
//   rotation: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   },

  // Название модели чехла
  name: {
    type: DataTypes.STRING(100),
    defaultValue: 'Базовый чехол'
  }

}, {
  tableName: 'cases',
  timestamps: true
});

export default Case;