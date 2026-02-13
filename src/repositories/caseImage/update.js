import { CaseLink } from '../../models/index.js';

export default async (guid, updateData, options = {}) => {
  const [updatedRows] = await CaseLink.update(updateData, {
    where: { guid },
    ...options
  });

  if (updatedRows === 0) {
    return null;
  }

  const updatedCaseLink = await CaseLink.findOne({
    where: { guid },
    ...options
  });

  return updatedCaseLink?.toJSON ? updatedCaseLink.toJSON() : updatedCaseLink;
};