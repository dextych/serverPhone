import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 5000;

export const db = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'hakaton',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql'
};


