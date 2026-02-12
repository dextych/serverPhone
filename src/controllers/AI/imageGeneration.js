import AIImageService from '../../infrastructure/aiImageService.js';
import { config } from '../../../config/config.js';
import { ValidationError, ApiKeyError, GenerationError } from '../../errors/index.js';

// Инициализируем сервис с ключом из .env
const aiService = new AIImageService(config.ai.apiKeyFreepik);

  // Генерация изображения по описанию
  export default async(req, res) => {
      const { prompt, style, resolution = '2k' } = req.body;
      
      if (!prompt) {
        throw new ValidationError('Параметр "prompt" обязателен', {
          code: 'ERR_PROMPT_REQUIRED'
        });
      }

      // Проверка API ключа
      if (!config.ai.apiKeyFreepik) {
        throw new ApiKeyError('API ключ не настроен в конфигурации', {
          code: 'ERR_API_KEY_MISSING'
        });
      }
      
      // Параметры для генерации
      const options = {
        prompt: `Phone case design: ${prompt}. Modern, stylish, high quality.`,
        resolution: resolution,
        aspect_ratio: 'square_1_1', // Квадратное для чехла
        model: 'realism', // или 'illustration' для стикеров
        styling: {
          styles: [{ name: 'modern', strength: 100 }],
          colors: [{ color: '#FF0000', weight: 0.3 }]
        }
      };
      
      // Генерация с ожиданием
      const result = await aiService.generateAndWait(prompt, options);

      if (!result) {
        throw new GenerationError('Не получен ответ от AI сервиса', {
          code: 'ERR_EMPTY_RESPONSE',
          data: { result }
        });
      }
      
      res.json({
        success: true,
        message: 'Изображение сгенерировано успешно',
        data: result
      });
  };