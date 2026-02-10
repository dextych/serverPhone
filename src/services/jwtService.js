import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/config.js';

export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });
        return token;
    } catch (error){
        throw new Error(`Ошибка генерации токена: ${error.message}`);
    }
};

export const verifyToken = (token) => {
    try{
        const verify = jwt.verify(token, jwtConfig.secret);
        return verify;
    } catch(error){
        throw new Error(`Ошибка верификации токена: ${error.message}`);
    }
};

export const decodeToken = (token) => {
    return jwt.decode(token);
}