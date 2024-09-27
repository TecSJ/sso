import express from 'express';
import dotenv from 'dotenv';
import { ssoDB } from './database/connection';
import accesosRouter from './routes/accesosRoutes';

dotenv.config();


const app = express(); 
ssoDB();
app.use(express.json());

app.use('/api', accesosRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
