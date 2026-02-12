import sequelize from "../infrastructure/sequelize.js";
import User from './user.model.js';

const models = { User };

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
    models,
    sequelize
}