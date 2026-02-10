import AIImageService from '../../services/aiImageService.js';

// Инициализируем сервис с ключом из .env
const aiService = new AIImageService(process.env.API_KEY_FREEPIK);

class StatusController {
  // Проверка статуса задачи
  static async checkStatus(req, res) {
    try {
      const { taskId } = req.params;
      const status = await aiService.checkTaskStatus(taskId);
      
      res.json({
        success: true,
        status: status.status,
        imageUrl: status.generated?.[0],
        taskId: taskId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default StatusController;