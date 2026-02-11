import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';

export const generateToken = (payload) => {

    if(!payload){
        throw new Error('Payload не может быть пустым');
    }

    const token = jwt.sign(payload, config.secret, {
        expiresIn: config.expiresIn,
    });
    return token;

};

export const verifyToken = (token) => {
    
    if(!token){
        throw new Error('Токена нет');
    }
    const verify = jwt.verify(token, config.secret);
    return verify;
};

export const decodeToken = (token) => {
    return jwt.decode(token);
}