import { CaseLink } from '../../models/index.js';

export default async (data, options = {}) => {
  const caseLink = await CaseLink.create(data, options);
  return caseLink?.toJSON ? caseLink.toJSON() : caseLink;
};