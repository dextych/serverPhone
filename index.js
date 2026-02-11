    import express from 'express';
    import { config } from './config/config.js'; 
    import { testConnection, initializeDatabase } from './src/models/index.js';
    import { imageAI, auth} from './src/routes/index.js';

    const app = express();
    app.use(express.json()); // Парсит JSON
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
    res.send('Hello!');
    });
    

    app.use('/api/imageAI', imageAI);
    app.use('/api/auth', auth);

    const startServer = async () => {
    try {
        // 1. Проверяем подключение к БД
        console.log('🔄 Проверяем подключение к базе данных...');
        await testConnection();
        await initializeDatabase();
        
        // 2. Запускаем сервер
        app.listen(config.portS, () => {
        console.log('✅ СЕРВЕР ЗАПУЩЕН УСПЕШНО!');
        console.log(`📍 Локально:    http://localhost:${config.portS}`);
        });
    } catch (error) {
        console.error('❌ Не удалось запустить сервер:', error.message);
        process.exit(1);
    }
    };

    // Запускаем сервер
    startServer();