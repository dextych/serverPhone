import { createCaseLink } from '../../repositories/caseImage/index.js';
import { getCase } from '../../repositories/case/index.js';
import { findImageByGuid } from '../../repositories/image/index.js';
import { ValidationError, NotFoundError, UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {

  if (!req.user?.guid) {
    throw new UnauthorizedError('Требуется авторизация', {
      code: 'ERR_UNAUTHORIZED'
    });
  }

  const { 
    caseId, 
    imageId, 
    name,
    material,
    telephoneModel,
    color,
    fileUrl,
    imageTransform,
    isPublic 
  } = req.body;

  // Валидация обязательных полей
  if (!caseId || !imageId || !name) {
    throw new ValidationError('Не указаны обязательные поля: caseId, imageId, name', {
      code: 'ERR_MISSING_FIELDS'
    });
  }

  // Проверяем существование чехла
  const case_ = await getCase(caseId);
  if (!case_) {
    throw new NotFoundError('Чехол не найден', {
      code: 'ERR_CASE_NOT_FOUND'
    });
  }

  // Проверяем существование изображения
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

  // Создаём запись
  const caseLink = await createCaseLink({
    userId: req.user.guid,
    caseId,
    imageId,
    name,
    material: material || null,
    telephoneModel: telephoneModel || null,
    color: color || '#FFFFFF',
    fileUrl: fileUrl || null,
    imageTransform: imageTransform || null,
    isPublic: isPublic || false
  });

  res.status(201).json({
    success: true,
    message: 'Дизайн создан',
    data: caseLink
  });
};