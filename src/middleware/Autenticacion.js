import fs from 'fs';
import jwt from 'jsonwebtoken';

import { Respuesta } from './respuestasHttp.js';

const Autenticacion = ( modulo, accion ) => {
    
    return async (req, res, next) => {
        
        const con = await db.getConnection();
        const credencial = req.headers.credencial;
        const llavePublica = fs.readFileSync('./llaves/pub.key', 'utf8');
        const autor  = 'Tecnologico superior de Jalisco';
        const dominio  = 'tsj.mx'; 
        const opcionesVerificacion = {
            issuer:  autor,
            audience:  dominio,
            expiresIn:  "1h",
            algorithm:  ["RS256"]
        };

        try{
            const validacion = jwt.verify( credencial, llavePublica, opcionesVerificacion );

            const [ resultado1 ] = await con.execute('SELECT idEntorno FROM Entornos WHERE clave = ? AND estado = "Activo" ', [ req.params.entorno ] );
            if( resultado1.length === 0 ) throw new Respuesta( 422, 'ERROR','¡Error de validación!', `El entorno (${ entorno }) no existe!`);
            const [ resultado2 ] = await con.execute('SELECT * FROM Credenciales WHERE idCredencial = ? AND idEntorno = ? and estado = "Validado" ',[ validacion.idCredencial, resultado1[0].idEntorno ]);
            if( resultado2.length === 0 ) throw new Respuesta( 422, 'ERROR','¡Acceso denegado!', `Credencial ${ credencial } no disponible!`);
            const [ resultado3 ] = await con.execute('SELECT idAplicacion FROM Aplicaciones WHERE idEntorno = ? AND clave = "sso" AND estado = "Activo" ', [ resultado1[0].idEntorno ] );
            if( resultado3.length === 0 ) throw new Respuesta( 422, 'ERROR','¡Error de validación!', `La Aplicación (SSO) no existe!`);
            const [ resultado4 ] = await con.execute('SELECT idModulo FROM Modulos WHERE idAplicacion = ? AND clave = ? AND estado = "Activo" ', [ resultado3[0].idAplicacion, modulo ] );
            if( resultado4.length === 0 ) throw new Respuesta( 422, 'ERROR','¡Error de validación!', `El Modulo (${ modulo }) no existe!`);
            const [ resultado5 ] = await con.execute('SELECT idRol FROM RelacionRoles WHERE idCredencial = ? ', [ resultado2[0].idCredencial ] );
            if( resultado5.length === 0 ) throw new Respuesta( 422, 'ERROR','¡Error de validación!', `No existe ningun rol!`);

            let permitido = 'No';
            for( const rol of resultado5 ){
                const [ resultado6 ] = await con.execute(`SELECT count(*) as num FROM Accesos WHERE idModulo = ? AND idRol = ? and ${ accion } = 1 `, [ resultado4[0].idModulo, rol.idRol ] );
                if( resultado6[0].num > 0 ) permitido = 'Si';    
            }
            if( permitido === "No") throw new Respuesta( 403, 'ERROR','¡Acceso Denegado!', '¡Permisos insuficientes!' );
            con.release();
            req.credencial = validacion.idCredencial;
            next();
            
        }catch( respuesta ){
            con.release();
            next( respuesta );
        }
    }
}

export default validarJWT