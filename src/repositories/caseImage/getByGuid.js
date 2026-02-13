import { CaseLink } from '../../models/index.js';

export default async (guid, options = {}) => {
  const caseLink = await CaseLink.findOne({
    where: { guid },
    ...options
  });

  return caseLink?.toJSON ? caseLink.toJSON() : caseLink;
};