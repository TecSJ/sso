import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const ssoDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('Connected to the MySQL database',process.env.DB_HOST);
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};
