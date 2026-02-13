import { CaseLink } from '../../models/index.js';

export default async (userId, options = {}) => {
  const caseLinks = await CaseLink.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    ...options
  });

  return caseLinks.map(item => item.toJSON ? item.toJSON() : item);
};