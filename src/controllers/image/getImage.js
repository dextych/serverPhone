import { findImageByGuid } from '../../repositories/image/index.js';
import { NotFoundError, UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {
    const { guid } = req.params;
    
    // Проверка авторизации
    if (!req.user || !req.user.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }
    
    // Ищем изображение
    const image = await findImageByGuid(guid);
    
    if (!image) {
      throw new NotFoundError('Изображение не найдено', {
        code: 'ERR_IMAGE_NOT_FOUND'
      });
    }
    
    // Проверяем, что изображение принадлежит пользователю
    if (image.userId !== req.user.guid) {
      throw new UnauthorizedError('Нет доступа к этому изображению', {
        code: 'ERR_ACCESS_DENIED'
      });
    }
    
    // Отдаём изображение
    res.json({
      success: true,
      data: image
    });  
};