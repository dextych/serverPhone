import sequelize from "../infrastructure/sequelize.js";
import User from './user.model.js';

const models = {
    User
}

// Функция для синхронизации всех моделей с БД
const syncModels = async (options = {}) => {
  try {
    const syncOptions = {
      alter: true, 
      force: false, 
      ...options
    };
    
    await sequelize.sync(syncOptions);
    console.log('✅ Все модели синхронизированы с БД');
    return true;
  } catch (error) {
    console.error('❌ Ошибка синхронизации моделей:', error);
    return false;
  }
};

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('test connection: true');
        return true;
    } catch (error) {
        console.error('test connection: false', error);
        return false;
    }
};  

// Функция для инициализации всех моделей и синхронизации
const initializeDatabase = async () => {
  console.log('🔄 Инициализация базы данных...');
  
  // 1. Тестируем подключение
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Не удалось подключиться к БД');
  }
  
  // 2. Синхронизируем модели
  await syncModels();
  
  // 3. Устанавливаем связи между моделями (если будут)
  // setupAssociations();
  
  console.log('✅ База данных инициализирована');
  return true;
};

export {
    testConnection,
    syncModels,
    initializeDatabase,
    User,
    models,
    sequelize
}