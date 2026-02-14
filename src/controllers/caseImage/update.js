import { getCaseLink, updateCaseLink } from '../../repositories/caseImage/index.js';
import { NotFoundError, UnauthorizedError, ValidationError } from '../../errors/index.js';

export default async (req, res) => {
    const { guid } = req.params;
    const updateData = req.body;

    if (!req.user?.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }

    // Проверяем, что есть хоть одно поле для обновления
    if (Object.keys(updateData).length === 0) {
      throw new ValidationError('Нет данных для обновления', {
        code: 'ERR_NO_DATA'
      });
    }

    // Получаем существующий дизайн
    const existingCaseLink = await getCaseLink(guid);

    if (!existingCaseLink) {
      throw new NotFoundError('Дизайн не найден', {
        code: 'ERR_CASELINK_NOT_FOUND'
      });
    }

    // Проверяем, что дизайн принадлежит пользователю
    if (existingCaseLink.userId !== req.user.guid) {
      throw new UnauthorizedError('Нет доступа к этому дизайну', {
        code: 'ERR_ACCESS_DENIED'
      });
    }

    // Обновляем
    const updatedCaseLink = await updateCaseLink(guid, updateData);

    res.json({
      success: true,
      message: 'Дизайн обновлён',
      data: updatedCaseLink
    });
};