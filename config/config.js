import dotenv from 'dotenv';

dotenv.config();

export const config = {
    portS: process.env.PORT || 5000,

    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'hakaton',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',

    apiKeyFreepik: process.env.API_KEY_FREEPIK,

    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
};


