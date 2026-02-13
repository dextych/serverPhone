import { createCaseLink } from '../../repositories/caseImage/index.js';
import { getCase } from '../../repositories/case/index.js';
import { findImageByGuid } from '../../repositories/image/index.js';
import { ValidationError, NotFoundError, UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {
    // Проверка авторизации
    if (!req.user?.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }

    const { caseId, imageId, designName, rotation } = req.body;

    // Валидация
    if (!caseId || !imageId) {
      throw new ValidationError('Не указаны caseId или imageId', {
        code: 'ERR_MISSING_FIELDS'
      });
    }

    // Проверяем, существует ли чехол
    const case_ = await getCase(caseId);
    if (!case_) {
      throw new NotFoundError('Чехол не найден', {
        code: 'ERR_CASE_NOT_FOUND'
      });
    }

    // Проверяем, существует ли изображение
    const image = await findImageByGuid(imageId);
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

    // Создаём дизайн
    const caseLink = await createCaseLink({
      userId: req.user.guid,
      caseId,
      imageId,
      designName: designName || 'Мой дизайн',
      rotation: rotation || 0
    });

    res.status(201).json({
      success: true,
      message: 'Дизайн создан',
      data: caseLink
    });
};