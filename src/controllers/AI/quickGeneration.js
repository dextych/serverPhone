import AIImageService from '../../infrastructure/aiImageService.js';
import { config } from '../../../config/config.js';
import { ValidationError, ApiKeyError, AiServiceError } from '../../errors/index.js';

const aiService = new AIImageService(config.apiKeyFreepik);

class QuickGenerationController {
  // Быстрая генерация (возвращает только task_id)
  static async generateQuick(req, res) {
      const { prompt } = req.body;

      if (!prompt) {
        throw new ValidationError('Параметр "prompt" обязателен', {
          code: 'ERR_PROMPT_REQUIRED',
          errors: [{ field: 'prompt', message: 'Описание изображения обязательно' }]
        });
      }

      // Проверка API ключа
      if (!config.apiKeyFreepik) {
        throw new ApiKeyError('API ключ не настроен в конфигурации', {
          code: 'ERR_API_KEY_MISSING'
        });
      }
      
      const task = await aiService.generateImage(prompt);

      // Проверка ответа
      if (!task) {
        throw new AiServiceError('Не получен ответ от AI сервиса', {
          code: 'ERR_EMPTY_RESPONSE'
        });
      }
      
      res.json({
        success: true,
        message: 'Задача на генерацию создана',
        taskId: task.task_id,
        checkUrl: `/api/images/status/${task.task_id}`
      });
  }
}

export default QuickGenerationController;