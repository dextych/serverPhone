import { CaseLink } from '../../models/index.js';

export default async (guid, options = {}) => {
  const deletedRows = await CaseLink.destroy({
    where: { guid },
    ...options
  });

  return deletedRows > 0;
};