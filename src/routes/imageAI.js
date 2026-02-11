import express from 'express';
import ImageGenerationController from '../controllers/AI/imageGeneration.js';
import QuickGenerationController from '../controllers/AI/quickGeneration.js';
import StatusController from '../controllers/AI/status.js';
import authMiddleware from '../infrastructure/middleware/auth.js';

const router = express.Router();

// Генерация изображения по тексту
router.post('/generate', authMiddleware, ImageGenerationController.generateFromText);

// Быстрая генерация (async)
router.post('/generate-quick', authMiddleware, QuickGenerationController.generateQuick);

// Проверка статуса
router.get('/status/:taskId', authMiddleware, StatusController.checkStatus);

export default router;