import AIImageService from '../../services/aiImageService.js';

// Инициализируем сервис с ключом из .env
const aiService = new AIImageService(process.env.API_KEY_FREEPIK);

class QuickGenerationController {
  // Быстрая генерация (возвращает только task_id)
  static async generateQuick(req, res) {
    try {
      const { prompt } = req.body;
      
      const task = await aiService.generateImage(prompt);
      
      res.json({
        success: true,
        message: 'Задача на генерацию создана',
        taskId: task.task_id,
        checkUrl: `/api/images/status/${task.task_id}`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default QuickGenerationController;