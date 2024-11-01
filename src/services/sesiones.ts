import { ssoDB } from '../model/Connection';
import { queries } from '../queries/sesiones';
import { Exception } from '../model/Exception';
import bcrypt from 'bcrypt';
import JWT from '../model/JWT';
import * as preferencias from '../services/preferencias';
import * as codigos from '../services/codigos';

export const getSesion = async (curp: string | undefined, correo: string | undefined, celular: string | undefined, contrasena: string) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [curp, correo, `__-${celular}`]);
    if (result.length > 0) {
        const credencial = result[0];
        if( !contrasena ){
            return { statusCode: 0, credencial: credencial.idCredencial, correo: credencial.correo, celular: credencial.celular };
        }
        const coinciden = await bcrypt.compare(contrasena, credencial.contrasena);
        if (coinciden) {
            if (credencial.estado === 'Inactivo') {
                throw new Exception('403', 'La cuenta está bloqueada!');
            }
            if (credencial.estado === 'Activo') {
                const correo_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
                const celular_val = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Validación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);
                if (!correo_val || !celular_val) {
                    return {
                        statusCode: 202,
                        message: 'Validación de correo o celular requerida.',
                        actionRequired: 'VALIDATE_CONTACT_INFO',
                        validationNeeded: {
                            correo: !correo_val,
                            celular: !celular_val,
                        },
                        correo: credencial.correo,
                        celular: credencial.celular,
                        credencial: credencial.idCredencial
                    };
                }{
                const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.correo, credencial.celular);
                    return {
                        statusCode: 200,
                        token,
                    };
                }
            } else {
                const response = await preferencias.getPreferencia(credencial.idCredencial);
                const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
                const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);

                if (!correo_auth || (response?.dobleFactor === 'S' && !celular_auth)) {
                    return {
                        statusCode: 202,
                        message: 'Autenticación de correo o celular requerida.',
                        actionRequired: 'AUTHENTICATE_CONTACT_INFO',
                        authenticationNeeded: {
                            correo: !correo_auth,
                            celular: response?.dobleFactor === 'S' && !celular_auth,
                        },
                        correo: credencial.correo,
                        celular: credencial.celular,
                        credencial: credencial.idCredencial
                    };
                }
                await codigos.deleteCodigos( credencial.idCredencial );
                const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.correo, credencial.celular);
                return {
                    statusCode: 200,
                    token,
                };
            }
        } else {
            throw new Exception('401', 'Password Incorrecto!');
        }
    } else {
        throw new Exception('401', 'Cuenta no valida!');
    }
};

export const deleteSession = async ( idCredencial: string ) => {
    await ssoDB.query( queries.deleteSesion, [ idCredencial ]);
    return undefined;
}

export const setPassword = async (curp: string, correo: string, celular: string, contrasena: string) => {

    const [result]: any = await ssoDB.query(queries.getCredencial, [curp, correo, `__-${celular}`]);
    if (result.length === 0) {
        throw new Exception('401', 'Cuenta no valida!');
    }

    const credencial = result[0];
    if (credencial.estado === 'Inactivo') {
        throw new Exception('403', 'La cuenta está bloqueada!');
    }
    if (credencial.estado === 'Activo') {
        throw new Exception('403', 'La cuenta no está validada!');
    }

    const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Recuperación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
    const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Recuperación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);
    if (!correo_auth && !celular_auth) {
        return {
            statusCode: 202,
            message: 'Recuperación de correo o celular requerida.',
            actionRequired: 'RECOVER_CONTACT_INFO',
            authenticationNeeded: {
                correo: !correo_auth,
                celular: !celular_auth,
            },
            correo: credencial.correo,
            celular: credencial.celular,
            credencial: credencial.idCredencial
        };
    }
    const salt = await bcrypt.genSalt(10);
    await codigos.deleteCodigos( credencial.idCredencial );
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    await ssoDB.query(queries.updateContrasena, [credencial.idCredencial, criptContrasena]);
    const token = JWT.getToken( credencial.idCredencial, credencial.curp, credencial.correo, credencial.celular );
    return {
        statusCode: 200,
        token,
    };
};
