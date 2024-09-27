import express from 'express';
import dotenv from 'dotenv';
import { ssoDB } from './database/connection';
import accesosRoutes from './routes/accesosRoutes';
import modulosRoutes from './routes/modulosRoutes';

dotenv.config();


const app = express(); 
app.use(express.json());

app.use('/api', modulosRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
