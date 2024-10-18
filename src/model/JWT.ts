import { Exception } from './Exception';
import fs from 'fs';
import jwt, { SignOptions, Algorithm } from 'jsonwebtoken';

export default class JWT {

    public static getToken ( idCredencial: string, curp: string, correo: string, celular: string ): string  {
        try {
            const payload = { idCredencial, curp, correo, celular };
            const llavePrivada = fs.readFileSync(`${__dirname}/admin.key`, 'utf8');
            const opcionesFirma: SignOptions = {
                issuer: 'Tecnologico superior de Jalisco',
                subject: curp,
                audience: 'tsj.mx',
                expiresIn: "24h",
                algorithm: "RS256" as Algorithm 
            };
            const token = jwt.sign( payload, llavePrivada, opcionesFirma);
            return token;

        } catch (error : any ) {
            throw new Exception( error.message, error );
        }
    }
}
