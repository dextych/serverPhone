import { CaseLink } from "../../models/index.js";

export default async (options = {}) => {
  const caseLinks = await CaseLink.findAll({
    where: { isPublic: true },
    order: [['createdAt', 'DESC']],
    ...options
  });

  return caseLinks.map(item => item.toJSON ? item.toJSON() : item);
};