import express from 'express';
import dotenv from 'dotenv';
import modulosRoutes from './routes/modulosRoutes';
import rolesRoutes from './routes/rolesRoutes';
import gruposRoutes from './routes/gruposRoutes';
import credencialesRoutes from './routes/credencialesRoutes';
import perfilesRoutes from './routes/perfilesRoutes';
import aplicaciones from './routes/perfilesRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', modulosRoutes);
app.use('/api', rolesRoutes);
app.use('/api', gruposRoutes);
app.use('/api', credencialesRoutes);
app.use('/api', perfilesRoutes);
app.use('/api', aplicaciones);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
