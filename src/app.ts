import express from 'express';
import dotenv from 'dotenv';
import * as routes from './routes';
dotenv.config();

const app = express();
app.use(express.json());
app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', routes.mdulos);
app.use('/api', routes.roles);
app.use('/api', routes.grupos);
app.use('/api', routes.etiquetas);
app.use('/api', routes.credenciales);
app.use('/api', routes.perfiles);
app.use('/api', routes.aplicaciones);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
