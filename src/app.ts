import express from 'express';
import dotenv from 'dotenv';
import * as routes from './routes';
dotenv.config();

const app = express();
app.use(express.json());
app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, api_key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/roles', routes.roles);
app.use('/grupos', routes.grupos);
app.use('/credenciales', routes.credenciales);
app.use('/aplicaciones', routes.aplicaciones );
app.use('/parametros', routes.parametros );
app.use('/sesiones', routes.sesiones );

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
