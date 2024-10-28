import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/codigos';
import { QueryBuilder } from '../model/QueryBuilder';
import Mail from '../model/Mail'
import { Codigo } from '../types';

export const getCodigo = async (idCodigo: string): Promise<Codigo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getCodigo, [idCodigo]);
    return rows[0] as Codigo || undefined;
}

export const getCodigos = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Codigo[] | undefined>  => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getCodigos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Codigo[]) : undefined;
}

export const insertCodigo = async (idCredencial: string, tipo: string, medio: string, destinatario: string): Promise<Codigo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertCodigo, [idCredencial, tipo, medio]);
    const codigo = rows[0] as Codigo;
    if (medio === 'Correo') {
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
        mail.enviarCorreo(destinatario, asunto, contenido);
    }
    if (medio === 'Celular') {
        // Anexar el codigo de uso para whatsapp business
    }
    return codigo;
}
