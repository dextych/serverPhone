import { getCaseLink } from '../../repositories/caseImage/index.js';
import { NotFoundError, UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {

    const { guid } = req.params;

    const caseLink = await getCaseLink(guid);

    if (!caseLink) {
      throw new NotFoundError('Дизайн не найден', {
        code: 'ERR_CASELINK_NOT_FOUND'
      });
    }

    // Если дизайн принадлежит другому пользователю — скрываем (опционально)
    if (caseLink.userId !== req.user?.guid) {
      throw new UnauthorizedError('Нет доступа к этому дизайну', {
        code: 'ERR_ACCESS_DENIED'
      });
    }

    res.json({
      success: true,
      data: caseLink
    });
};