import { DataTypes } from 'sequelize';
import sequelize from '../infrastructure/sequelize.js';
import User from './user.model.js';
import Case from './case.model.js';
import Image from './image.model.js';

const CaseLink = sequelize.define('CaseLink', {
  guid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'guid' }
  },

  caseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Case, key: 'guid' }
  },

  imageId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Image, key: 'guid' }
  },

  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  // Материал (JSON, не обрабатываем)
  material: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },

  // Модель телефона (JSON, не обрабатываем)
  telephoneModel: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },

  // Цвет (hex-код или название)
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '#FFFFFF'
  },

  // URL изображения (опционально)
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Трансформации изображения (JSON, не обрабатываем)
  imageTransform: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: null
  },

  // Публичный ли чехол
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }

}, {
  tableName: 'case_links',
  timestamps: true,

});

// Связи
User.belongsToMany(Case, { 
  through: CaseLink, 
  foreignKey: 'userId',
  otherKey: 'caseId'
});

Case.belongsToMany(User, { 
  through: CaseLink, 
  foreignKey: 'caseId',
  otherKey: 'userId'
});

Image.hasMany(CaseLink, {
  foreignKey: 'imageId',
  as: 'caseLinks'
});

CaseLink.belongsTo(Image, {
  foreignKey: 'imageId',
  as: 'image'
});

Case.hasMany(CaseLink, {
  foreignKey: 'caseId',
  as: 'caseLinks'
});

CaseLink.belongsTo(Case, {
  foreignKey: 'caseId',
  as: 'case'
});

User.hasMany(CaseLink, {
  foreignKey: 'userId',
  as: 'caseLinks'
});

CaseLink.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export default CaseLink;