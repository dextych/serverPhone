import fetch from 'node-fetch';
import { ApiKeyError } from '../errors/index.js';
import { 
  AiServiceError,
  ApiKeyError,
  GenerationError,
  NotFoundError,
  ValidationError
} from '../errors/index.js';

class AIImageService {
  constructor(apiKey) {
    if (!apiKey) {
        throw new ApiKeyError('API ключ не предоставлен при инициализации сервиса', {
        code: 'ERR_API_KEY_MISSING'
      });
    }
      this.apiKey = apiKey;
      this.baseUrl = 'https://api.freepik.com/v1/ai/mystic';
    }

  // Генерация изображения
  async generateImage(prompt, options = {}) {
    if (!prompt) {
       throw new ValidationError('Параметр "prompt" обязателен', {
       code: 'ERR_PROMPT_REQUIRED'
      });
    }
      
    const defaultOptions = {
      prompt: prompt,
      resolution: '2k',
      aspect_ratio: 'square_1_1',
      model: 'realism',
      creative_detailing: 33,
      filter_nsfw: true,
      // Добавьте другие параметры по умолчанию
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'x-freepik-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...defaultOptions,
        ...options
      })
    };

    console.log(`🔄 Отправляю запрос на генерацию: "${prompt}"`);
    const response = await fetch(this.baseUrl, requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new NotFoundError('Метод API не найден', {
       code: 'ERR_API_NOT_FOUND'
      });
    }
    
    console.log(`✅ Задача создана: ${data.data.task_id}`);
    return data.data;
  }

  // Проверка статуса задачи
  async checkTaskStatus(taskId) {

    const response = await fetch(`${this.baseUrl}/${taskId}`, {
      method: 'GET',
      headers: {
        'x-freepik-api-key': this.apiKey
      }
    });

    if(!response.status){
      console.error('Ошибка при проверке статуса', response.status, response.statusText);
    }
    
    const data = await response.json();
    return data.data;

  }

  // Полный цикл генерации с ожиданием
  async generateAndWait(prompt, options = {}, checkInterval = 2000, maxAttempts = 30) {
    // 1. Создаем задачу
    const task = await this.generateImage(prompt, options);
    
    // 2. Ждем завершения
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const status = await this.checkTaskStatus(task.task_id);
      
      if (status.status === 'COMPLETED') {
        console.log(`✅ Изображение сгенерировано: ${status.generated[0]}`);
        return {
          success: true,
          imageUrl: status.generated[0],
          taskId: task.task_id
        };
      }
      
      if (status.status === 'FAILED' || status.status === 'failed') {
        throw new GenerationError('Генерация изображения не удалась', {
          code: 'ERR_GENERATION_FAILED',
          data: status
        });
      }
      
      // Ждем перед следующей проверкой
      await new Promise(resolve => setTimeout(resolve, checkInterval));
      attempts++;
      console.log(`⏳ Проверка ${attempts}/${maxAttempts}...`);
    }
    
    throw new Error('Превышено время ожидания генерации');
  }
}

export default AIImageService;