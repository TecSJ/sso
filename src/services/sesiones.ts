import { ssoDB } from '../model/Connection';
import { queries } from '../queries/sesiones';
import { Exception } from '../model/Exception';
import bcrypt from 'bcrypt';
import JWT from '../model/JWT';
import * as preferencias from '../services/preferencias';
import * as codigos from '../services/codigos';

export const getSesion = async (curp: string | undefined, correo: string | undefined, celular: string | undefined, contrasena: string) => {
    const [result]: any = await ssoDB.query(queries.iniciarSesion, [curp, correo, celular]);
    if (result.length > 0) {
        const credencial = result[0];
        const coinciden = await bcrypt.compare(contrasena, credencial.contrasena);
        if (coinciden) {
            if (credencial.estado === 'Inactivo') {
                throw new Exception('0003', 'La cuenta esta bloqueada!');
            }
            if (credencial.estado === 'Activo') {
                const correo_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
                const celular_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);
                if (!correo_val) {
                    throw new Exception('0004', 'Error de validación de correo!');
                }
                if (!celular_val) {
                    throw new Exception('0005', 'Error de validación de celular!');
                }
            }
            if (credencial.estado === 'Validado') {
                const response = await preferencias.getPreferencia(credencial.idCredencial);
                const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
                const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);
                if (!correo_auth) {
                    throw new Exception('0006', 'Error de autenticación de correo!');
                }
                if (response.dobleFactor === 'S') {
                    if (!celular_auth) {
                        throw new Exception('0007', 'Error de autenticación de celular!');
                    }
                }
                const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.correo, credencial.celular);
                return token;
            }
        } else {
            throw new Exception('0002', 'Password Incorrecto!');
        }
    } else {
        throw new Exception('0001', 'Cuenta no valida!');
    }
}

