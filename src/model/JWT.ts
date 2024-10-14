import { Exception } from './Exception';
import fs from 'fs';
import jwt, { SignOptions, Algorithm } from 'jsonwebtoken';

export class JWT {

    public getToken (idCredencial: string, curp: string, cuenta: string): string | undefined {
        try {
            const payload = { idCredencial, curp, cuenta };
            const llavePrivada = fs.readFileSync( '../../admin.key', 'utf8');
            const autor = 'Tecnologico superior de Jalisco';
            const usuario = cuenta;
            const dominio = 'tsj.mx';

            const opcionesFirma: SignOptions = {
                issuer: autor,
                subject: usuario,
                audience: dominio,
                expiresIn: "24h",
                algorithm: "RS256" as Algorithm 
            };
            const token = jwt.sign(payload, llavePrivada, opcionesFirma);
            return token;

        } catch (error : any ) {
            throw new Exception( error.message, error );
        }
    }
}
