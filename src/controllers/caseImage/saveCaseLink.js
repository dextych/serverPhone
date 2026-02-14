import { saveCaseLink } from '../../services/saveCaseImage.js';
import { UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {
    if (!req.user?.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }

    const caseLinkData = req.body;
    const result = await saveCaseLink(caseLinkData, req.user.guid);

    res.json({
      success: true,
      message: 'Дизайн сохранён',
      data: result
    });
};