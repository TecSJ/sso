import express from 'express';
import * as routes from './routes';
import fs from 'fs';
import https from 'https';

const PORT: number = parseInt( process.env.PORT as string );

const app = express();
app.use(express.json());
app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, api_key, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
});

if ( process.env.NODE_ENV === 'development' ) {
    app.listen( PORT , () => {});
}else{
    const privateKey  = fs.readFileSync( process.env.SSL_KEY as string, 'utf8');
    const certificate = fs.readFileSync( process.env.SSL_CERT as string, 'utf8');
    const ca = fs.readFileSync( process.env.SSL_CA as string, 'utf8' );
    const credentials = { key: privateKey, ca: ca, cert: certificate };
    const app_ssl = https.createServer( credentials, app );
    app_ssl.listen( PORT, () => {} );
}

app.use('/roles', routes.roles);
app.use('/grupos', routes.grupos);
app.use('/credenciales', routes.credenciales);
app.use('/aplicaciones', routes.aplicaciones );
app.use('/parametros', routes.parametros );
app.use('/sesiones', routes.sesiones );

app.get('/', (req, res) => {
    res.send(`SSO en producción esta ejecutandose en https:${ PORT }`);
});