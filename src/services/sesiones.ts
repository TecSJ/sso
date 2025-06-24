import { ssoDB } from '../model/Connection';
import { queries } from '../queries/sesiones';
import { Exception } from '../model/Exception';
import bcrypt from 'bcrypt';
import JWT from '../model/JWT';
import * as preferencias from '../services/preferencias';
import * as codigos from '../services/codigos';
import { Aplicacion } from '../types/'
import { RowDataPacket } from 'mysql2';
import Mail from '../model/Mail'


export const getSesion = async (curp: string | undefined, correo: string | undefined, celular: string | undefined, contrasena: string) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [curp, correo, `__-${celular}`]);
    if (result.length > 0) {
        const credencial = result[0];
        if (!contrasena) {
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
                } {
                    const token = JWT.getToken(credencial.idCredencial, credencial.curp,credencial.nombre, credencial.correo, credencial.celular, credencial.grupos, credencial.aplicaciones);
                    return {
                        statusCode: 200,
                        token,
                    };
                }
            } else {
                const response = await preferencias.getPreferencia(credencial.idCredencial);
                const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
                const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);

                if (!correo_auth || !celular_auth) {
                    return {
                        statusCode: 202,
                        message: 'Autenticación de correo o celular requerida.',
                        actionRequired: 'AUTHENTICATE_CONTACT_INFO',
                        authenticationNeeded: {
                            correo: !correo_auth,
                            celular: !celular_auth,
                        },
                        correo: credencial.correo,
                        celular: credencial.celular,
                        credencial: credencial.idCredencial
                    };
                }
                await codigos.deleteCodigos(credencial.idCredencial);
                const token = JWT.getToken(credencial.idCredencial, credencial.curp,credencial.nombre, credencial.correo, credencial.celular, credencial.grupos, credencial.aplicaciones);
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

export const getGoogle = async (correo: string) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [undefined, correo, undefined]);
    if (result.length > 0) {
        const credencial = result[0];
        if (credencial.estado === 'Inactivo') {
            throw new Exception('403', 'La cuenta está bloqueada!');
        }
        if (credencial.estado === 'Validado') {
            const token = JWT.getToken(
                credencial.idCredencial, 
                credencial.curp, 
                credencial.nombre,
                credencial.correo, 
                credencial.celular, 
                credencial.grupos, 
                credencial.aplicaciones
            );
            return { token: token };
        } else {
            throw new Exception('401', 'Cuenta no validada!');
        }
    } else {
        throw new Exception('401', 'Cuenta no válida!');
    }
};


export const getValidacion = async (curp: string | undefined, correo: string | undefined, celular: string | undefined) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [curp, correo, celular]);
    if (result.length > 0) {
        const credencial = result[0];
        if (credencial.estado === 'Inactivo') {
            throw new Exception('403', 'La cuenta está bloqueada!');
        }
        if (credencial.estado === 'Validado') {
            const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.nombre, credencial.correo, credencial.celular, credencial.grupos, credencial.aplicaciones);
            return { token: token };
        } else {
            throw new Exception('401', 'Cuenta no esta validada!');
        }
    } else {
        throw new Exception('401', 'Cuenta no valida!');
    }
};

export const getAutenticacion = async (curp: string | undefined, correo: string | undefined, celular: string | undefined) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [curp, correo, `__-${celular}`]);
    if (result.length > 0) {
        const credencial = result[0];
        if (credencial.estado === 'Inactivo') {
            throw new Exception('403', 'La cuenta está bloqueada!');
        }
        if (credencial.estado === 'Validado') {

            const response = await preferencias.getPreferencia(credencial.idCredencial);
            const correo_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Correo,estado:eq:Confirmado`, undefined, 1, 1);
            const celular_auth = await codigos.getCodigos(`idCredencial:eq:${credencial.idCredencial},tipo:eq:Autenticación,medio:eq:Celular,estado:eq:Confirmado`, undefined, 1, 1);
            if (!correo_auth || (response?.dobleFactor === 'S' && !celular_auth)) {
                throw new Exception('401', 'Cuenta no esta auntenticada!');
            }
            const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.nombre, credencial.correo, credencial.celular, credencial.grupos, credencial.aplicaciones);
            return { token: token };
        } else {
            throw new Exception('401', 'Cuenta no esta validada!');
        }
    } else {
        throw new Exception('401', 'Cuenta no valida!');
    }
};


export const deleteSession = async (idCredencial: string) => {
    await ssoDB.query(queries.deleteSesion, [idCredencial]);
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
    const salt = await bcrypt.genSalt(10);
    await codigos.deleteCodigos(credencial.idCredencial);
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    await ssoDB.query(queries.updateContrasena, [credencial.idCredencial, criptContrasena]);
    const token = JWT.getToken(credencial.idCredencial, credencial.curp, credencial.nombre, credencial.correo, credencial.celular, credencial.grupos, credencial.aplicaciones);
    return {
        statusCode: 200,
        token,
    };
};

export const getData = async ( idCredencial: string ,filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Aplicacion[] | undefined> => {
    const query = `
        SELECT a.idAplicacion, a.clave AS aplicacionClave, a.redireccion, a.img, a.posicion,a.nombre AS aplicacionNombre,
        m.idModulo, m.img AS moduloimg, m.icon AS moduloIcon,m.clave AS moduloClave, m.posicion, m.nombre AS moduloNombre,
        ac.idAcceso, ac.accion1, ac.accion2, ac.accion3, ac.accion4, ac.accion5, ac.accion6, ac.accion7, ac.accion8,
        r.idRol, r.clave AS rolClave, r.nombre AS rolNombre,
        p.idPerfil,
        e.idEtiqueta, e.nombre AS etiquetaNombre, e.estado AS etiquetaEstado,
        g.idGrupo, g.clave AS grupoClave, g.nombre AS grupoNombre, g.estado AS grupoEstado
        FROM Credenciales c
        INNER JOIN Perfiles p ON c.idCredencial = p.idCredencial AND p.estado = 'Activo'
        INNER JOIN Roles r ON p.idRol = r.idRol AND r.estado = 'Activo'
        INNER JOIN Accesos ac ON r.idRol = ac.idRol AND (ac.accion1 = '1' OR ac.accion2 = '1' OR ac.accion3 = '1' OR ac.accion4 = '1' OR ac.accion5 = '1' OR ac.accion6 = '1'
         OR ac.accion7 = '1' OR ac.accion8 = '1')
        INNER JOIN Modulos m ON ac.idModulo = m.idModulo
        INNER JOIN Aplicaciones a ON m.idAplicacion = a.idAplicacion
        LEFT JOIN Asociacion asoc ON c.idCredencial = asoc.idCredencial
        LEFT JOIN Etiquetas e ON asoc.idEtiqueta = e.idEtiqueta AND e.estado = 'Activo'
        LEFT JOIN Miembros mbr ON c.idCredencial = mbr.idCredencial
        LEFT JOIN Grupos g ON mbr.idGrupo = g.idGrupo AND g.estado = 'Activo'
        WHERE a.estado = 'Activo' AND m.estado = 'Activo' AND c.idCredencial = ?
        ORDER BY a.posicion ASC, m.posicion ASC;`;
        const [rows] = await ssoDB.query<RowDataPacket[]>(query, [idCredencial]);
        if (rows.length === 0) {
        return undefined;
    }
    const aplicaciones: any[] | PromiseLike<Aplicacion[] | undefined> | undefined = [];
    rows.forEach(row => {
        let aplicacion = aplicaciones.find(a => a.idAplicacion === row.idAplicacion);
        if (!aplicacion) {
            aplicacion = {
                idAplicacion: row.idAplicacion,
                aplicacionClave: row.aplicacionClave.charAt(0).toUpperCase() + row.aplicacionClave.slice(1),
                aplicacionNombre: row.aplicacionNombre,
                aplicacionRedireccion: row.redireccion,
                aplicacionImagen: process.env.IMG_DRIVE_URL+row.img,
                modulos: []
            };
            aplicaciones.push(aplicacion);
        }
        let modulo = aplicacion.modulos.find((m: { idModulo: number }) => m.idModulo === row.idModulo);
        if (!modulo) {
            modulo = {
                idModulo: row.idModulo,
                moduloClave: row.moduloClave,
                moduloNombre: row.moduloNombre,
                moduloIcon: row.moduloIcon,
                moduloImagen: process.env.IMG_DRIVE_URL + row.moduloimg,
                accesos: []
            };
            aplicacion.modulos.push(modulo);
        }
        const acciones = {
            agregar: row.accion1 ? 1 : 0,
            consultar: row.accion2 ? 1 : 0,
            editar: row.accion3 ? 1 : 0,
            cancelar: row.accion4 ? 1 : 0,
            subir: row.accion5 ? 1 : 0,
            validar: row.accion6 ? 1 : 0,
            autorizar: row.accion7 ? 1 : 0,
            publicar: row.accion8 ? 1 : 0,
        };
        if (row.idAcceso) {
            if (!modulo.accesos.find((a: { idAcceso: number }) => a.idAcceso === row.idAcceso)) {
                modulo.accesos.push({
                    idAcceso: row.idAcceso,
                    acciones
                });
            }
        }
        if (row.idRol && !aplicacion.roles) {
            aplicacion.roles = [];
        }
        if (row.idRol && !aplicacion.roles.find((r: { idRol: number }) => r.idRol === row.idRol)) {
            aplicacion.roles.push({
                idRol: row.idRol,
                rolClave: row.rolClave,
                rolNombre: row.rolNombre
            });
        }
        if (row.idEtiqueta) {
            if (!aplicacion.etiquetas) {
                aplicacion.etiquetas = [];
            }
            if (!aplicacion.etiquetas.find((e: { idEtiqueta: number }) => e.idEtiqueta === row.idEtiqueta)) {
                aplicacion.etiquetas.push({
                    idEtiqueta: row.idEtiqueta,
                    etiquetaNombre: row.etiquetaNombre,
                    etiquetaEstado: row.etiquetaEstado
                });
            }
        }
        if (row.idGrupo) {
            if (!aplicacion.grupos) {
                aplicacion.grupos = [];
            }
            if (!aplicacion.grupos.find((g: { idGrupo: number }) => g.idGrupo === row.idGrupo)) {
                aplicacion.grupos.push({
                    idGrupo: row.idGrupo,
                    grupoClave: row.grupoClave,
                    grupoNombre: row.grupoNombre,
                    grupoEstado: row.grupoEstado
                });
            }
        }
    });

    return aplicaciones;
};

export const mail = async (correo: string | undefined, clave: string | undefined) => {
    if (!correo) {
        throw new Exception('400', 'Correo es requerido para enviar el email.');
    }
    const mail = new Mail();
    let asunto = '';
    let contenido = '';
        asunto = 'Recuperación de contraseña';
        contenido = `Tu nueva contraseña es: ${clave}`
        mail.enviarCorreo(correo, asunto, contenido);
    return {
        statusCode: 200,
        message: 'Correo enviado exitosamente',
    };
};
