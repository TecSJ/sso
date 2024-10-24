import express from 'express';
import * as routes from './routes';

const PORT: number = parseInt( process.env.PORT as string );

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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
