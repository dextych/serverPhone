import { getUserCaseLinks } from '../../repositories/caseImage/index.js';
import { UnauthorizedError } from '../../errors/index.js';

export default async (req, res) => {
    if (!req.user?.guid) {
      throw new UnauthorizedError('Требуется авторизация', {
        code: 'ERR_UNAUTHORIZED'
      });
    }

    const caseLinks = await getUserCaseLinks(req.user.guid);

    res.json({
      success: true,
      count: caseLinks.length,
      data: caseLinks
    });
};