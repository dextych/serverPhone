import { Case } from '../../models/index.js';

export default async (options = {}) => {
  const defaultCase = await Case.findOne({
    where: { name: 'Базовый чехол' },
    ...options
  });

  return defaultCase?.toJSON ? defaultCase.toJSON() : defaultCase;
};