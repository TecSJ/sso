import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/codigos';
import { QueryBuilder } from '../model/QueryBuilder';
import Mail from '../model/Mail'
import { Codigo, Credencial } from '../types';
import * as credencial from './credenciales'

export const getCodigo = async (idCodigo: string): Promise<Codigo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getCodigo, [idCodigo]);
    return rows[0][0] as Codigo || undefined;
}

export const getCodigos = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Codigo[] | undefined>  => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getCodigos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Codigo[]) : undefined;
}

export const deleteCodigos = async ( idCredencial: string): Promise<number> => {
    const [result]: any = await ssoDB.query( queries.deletCodigo, [idCredencial]);
    return result.affectedRows;
};

export const insertCodigo = async (idCredencial: string, tipo: string, medio: string ): Promise<Codigo | undefined> => {

    const data: Credencial | undefined = await credencial.getCredencial(idCredencial);
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertCodigo, [idCredencial, tipo, medio]);
    const codigo = rows[0] as Codigo;
    if (medio === 'Correo' && data?.correo) {
        const mail = new Mail();
        let asunto = '';
        let contenido = '';
        if (tipo === 'Validación') {
            asunto = 'Código de validación'
            contenido = `El código de validación es: ${codigo.clave}`
        }
        if (tipo === 'Autenticación') {
            asunto = 'Código de autenticación'
            contenido = `El código de autenticación es: ${codigo.clave}`
        }
        if (tipo === 'Recuperación') {
            asunto = 'Código de recuperación'
            contenido = `El código de recuperación es: ${codigo.clave}`
        }
        mail.enviarCorreo( data?.correo, asunto, contenido);
    }
    if (medio === 'Celular') {
        // Anexar el codigo de uso para whatsapp business
    }
    return codigo;
}


export const validarCodigo = async ( idCredencial: string, clave: string, medio: string, tipo: string): Promise<Codigo> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>( queries.validarCodigo, [ idCredencial, clave, medio, tipo ]);
    const codigo = rows[0] as Codigo || undefined;
    if( codigo ){
        await ssoDB.query(queries.confirmarCodigo, [ codigo.idCodigo ]);
    }
    return rows[0][0] as Codigo || undefined;
}
