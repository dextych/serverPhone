import { getCase } from '../../repositories/case/index.js';
import { NotFoundError } from '../../errors/index.js';

export default async (req, res) => {
    const case_ = await getCase();

    if (!case_) {
      throw new NotFoundError('Чехол не найден', {
        code: 'ERR_CASE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: case_
    });
};