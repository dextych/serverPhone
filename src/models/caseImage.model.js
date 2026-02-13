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

  rotation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  // Название дизайна
  designName: {
    type: DataTypes.STRING(100),
    defaultValue: 'Мой дизайн'
  }

}, {
  tableName: 'case_links',
  timestamps: true,
});

// Связи
User.belongsToMany(Case, { through: CaseLink, foreignKey: 'userId' });
Case.belongsToMany(User, { through: CaseLink, foreignKey: 'caseId' });

Image.belongsToMany(CaseLink, { through: CaseLink, foreignKey: 'imageId' });

export default CaseLink;