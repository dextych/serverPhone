import { User } from '../../models/index.js';

export default async (userData, options = {}) => {
    return await User.create(userData, options);
};