import fetch from 'node-fetch';

class AIImageService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.freepik.com/v1/ai/mystic';
  }

  // Генерация изображения
  async generateImage(prompt, options = {}) {
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
      throw new Error(`AI API Error: ${data.message || 'Unknown error'}`);
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

    if(!response.ok){
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
      
      if (status.status === 'FAILED') {
        throw new Error('Генерация изображения не удалась');
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