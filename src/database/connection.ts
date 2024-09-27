import dotenv from 'dotenv';
import mysql from 'mysql2/promise';


dotenv.config();

let connection: mysql.Connection | null = null;

export const ssoDB = async (): Promise<mysql.Connection> => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            console.log('Connected to the database');
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }
    return connection;
};
