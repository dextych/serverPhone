import sequelize from "../infrastructure/sequelize.js";
import User from './user.model.js';
import Image from "./image.model.js";
import CaseLink from "./caseImage.model.js";
import Case from "./case.model.js";

const models = { 
  User,
  Image,
  CaseLink,
  Case
};

// Единая функция инициализации 
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ База данных инициализирована');
    return true;
  } catch (error) {
    console.error('❌ Ошибка инициализации БД:', error);
    throw error;
  }
};

export {
    initializeDatabase,
    User,
    Image,
    CaseLink,
    Case,
    models,
    sequelize
}