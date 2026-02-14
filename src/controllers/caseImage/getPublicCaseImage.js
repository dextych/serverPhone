import { getPublic } from "../../repositories/caseImage/index.js";
import { NotFoundError } from "../../errors/index.js";

export default async (req, res) => {
    const caseLinks = await getPublic();

    if(!caseLinks){
        throw new NotFoundError('Публичные дизайны не найдены', {
            code: 'ERR_NOT_FOUND_PUBLIC'
        });
    }

    res.json({
      success: true,
      count: caseLinks.length,
      data: caseLinks
    });
};