import express from 'express';
import ImageGenerationController from '../controllers/AI/imageGeneration.js';
import QuickGenerationController from '../controllers/AI/quickGeneration.js';
import StatusController from '../controllers/AI/status.js';

const router = express.Router();

// Генерация изображения по тексту
router.post('/generate', ImageGenerationController.generateFromText);

// Быстрая генерация (async)
router.post('/generate-quick', QuickGenerationController.generateQuick);

// Проверка статуса
router.get('/status/:taskId', StatusController.checkStatus);

export default router;