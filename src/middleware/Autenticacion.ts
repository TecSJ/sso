import fs from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ssoDB } from '../model/Connection';
import { queries } from '../queries/autenticacion';
import path from 'path';

const Autenticacion = (modulo: string, accion: string) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers['authorization'];
            const TOKEN = authHeader && authHeader.split(' ')[1];
            const X_API_KEY = req.headers['api_key'] as string | undefined;
            if (!TOKEN) {  throw new Error('Falta token!'); }
            if (!X_API_KEY) {  throw new Error('Falta api-key!'); }
            if( X_API_KEY !== process.env.X_API_KEY ){  throw new Error('Error en api-key!'); }

            const keypath = path.resolve(__dirname, '../model/admin.key');
            const llave = fs.readFileSync(keypath, 'utf8');
            
            const autor = 'Tecnologico superior de Jalisco';
            const dominio = 'tsj.mx'; 
            const opcionesVerificacion = {
                issuer: autor,
                audience: dominio,
                expiresIn: "1h",
                algorithms: ["RS256"] as jwt.Algorithm[],
            };

            const datos = jwt.verify( TOKEN, llave, opcionesVerificacion) as JwtPayload;
            const [result]: any = await ssoDB.query(queries.getAccesos, [datos.idCredencial, modulo]);
            if (result.length === 0) { throw new Error('Acceso denegado!'); }
            const acceso = result[0];
            if ( acceso[`accion${accion}`] === 0) { throw new Error('Acceso denegado!'); }
            next();

        } catch ( error: any ) {
            if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ message: 'Token inválido' });
            } else {
                res.status(500).json({ message: error.message });
            }
            return
        }
    };
};

export default Autenticacion;
