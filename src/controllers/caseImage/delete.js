import { getCaseLink, deleteCaseLink } from '../../repositories/caseImage/index.js';
import { NotFoundError, UnauthorizedError } from '../../errors/index.js';

export default async (req, res, next) => {
    const { guid } = req.params;

    if (!req.user?.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }

    // Получаем запись
    const caseLink = await getCaseLink(guid);

    if (!caseLink) {
      throw new NotFoundError('Запись не найдена', {
        code: 'ERR_CASELINK_NOT_FOUND'
      });
    }

    // Проверяем, что запись принадлежит пользователю
    if (caseLink.userId !== req.user.guid) {
      throw new UnauthorizedError('Нет доступа к этой записи', {
        code: 'ERR_ACCESS_DENIED'
      });
    }

    // Удаляем
    const deleted = await deleteCaseLink(guid);

    if (!deleted) {
      throw new NotFoundError('Запись не найдена при удалении', {
        code: 'ERR_CASELINK_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      message: 'Запись успешно удалена',
      data: { guid }
    });
};