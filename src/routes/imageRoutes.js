import express from 'express';
import ImageController from '../controllers/imageController.js';

const router = express.Router();

// Генерация изображения по тексту
router.post('/generate', ImageController.generateFromText);

// Быстрая генерация (async)
router.post('/generate-quick', ImageController.generateQuick);

// Проверка статуса
router.get('/status/:taskId', ImageController.checkStatus);

// Эндпоинт для вебхука (если настроите)
router.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  // Здесь можно обновить статус в БД
  res.json({ received: true });
});

export default router;