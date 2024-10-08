import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const ssoDB: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// export const ssoDB = async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Connected to the MySQL database via pool:', process.env.DB_HOST);
//         return connection;
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         throw error;
//     }
// };

