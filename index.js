    import express from 'express';
    import { port } from './config/config.js'; 
    import { testConnection } from './src/models/index.js';
    import imageRoutes from './src/routes/imageRoutes.js';

    const app = express();

    app.get('/', (req, res) => {
    res.send('Hello!');
    });
    
    app.use(express.json()); // Парсит JSON
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/images', imageRoutes);

    const startServer = async () => {
    try {
        // 1. Проверяем подключение к БД
        console.log('🔄 Проверяем подключение к базе данных...');
        await testConnection();
        
        // 2. Запускаем сервер
        app.listen(port, () => {
        console.log('✅ СЕРВЕР ЗАПУЩЕН УСПЕШНО!');
        console.log(`📍 Локально:    http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Не удалось запустить сервер:', error.message);
        process.exit(1);
    }
    };

    // Запускаем сервер
    startServer();



// app.listen(port, () => {
//   console.log(`🚀 Server running: http://localhost:${port}`);
// });