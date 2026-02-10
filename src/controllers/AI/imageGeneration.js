import AIImageService from '../../services/aiImageService.js';

// Инициализируем сервис с ключом из .env
const aiService = new AIImageService(process.env.API_KEY_FREEPIK);

class ImageGenerationController {
  // Генерация изображения по описанию
  static async generateFromText(req, res) {
    try {
      const { prompt, style, resolution = '2k' } = req.body;
      
      if (!prompt) {
        return res.status(400).json({
          success: false,
          error: 'Параметр "prompt" обязателен'
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
      
      res.json({
        success: true,
        message: 'Изображение сгенерировано успешно',
        data: result
      });
      
    } catch (error) {
      console.error('❌ Ошибка в контроллере:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default ImageGenerationController;