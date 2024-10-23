import { ssoDB } from '../model/Connection';
import { queries } from '../queries/sesiones';
import { Exception } from '../model/Exception';
import bcrypt from 'bcrypt';
import JWT from '../model/JWT';
import * as preferencias from '../services/preferencias';
import * as codigos from '../services/codigos';

export const getSesion = async ( curp: string | undefined , correo: string | undefined, celular: string | undefined , contrasena: string) => {
    try {
        const [result]: any = await ssoDB.query( queries.iniciarSesion, [ curp, correo, celular ]);
        if( result.length > 0 ){
            const credencial = result[0];
            if( credencial.estado === 'Inactivo' ){
                throw new Error('La credencial esta bloqueada!');
            }
            if( credencial.estado === 'Activo' ){
                const correo_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1 );
                const celular_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1 );
                if( !correo_val ){
                    throw new Error('El codigo de validación del correo aun no ha sido confirmado!');
                }
                if( !celular_val ){
                    throw new Error('El codigo de validación del celular aun no ha sido confirmado!');
                }
            }
            if( credencial.estado === 'Validado' ){
                const coinciden = await bcrypt.compare( contrasena, credencial.contrasena );
                if( coinciden ){
                    const response = await preferencias.getPreferencia( credencial.idCredencial );
                    const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1 );
                    const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1 );
                    if( !correo_auth ){
                        throw new Error('El codigo de autenticación del correo aun no ha sido confirmado!');
                    }
                    if( response.dobleFactor === 'S' ){
                        if( !celular_auth ){
                            throw new Error('El codigo de autenticación del celular aun no ha sido confirmado!');
                        }
                    }
                    const token = JWT.getToken( credencial.idCredencial, credencial.curp, credencial.correo, credencial.celular );
                    return token;
                }else{
                    throw new Error('Password incorrecto!');
                }
            }
        }else{
            throw new Error('Cuenta no valida!');
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

