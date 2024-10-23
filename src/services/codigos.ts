import { ssoDB } from '../model/Connection';
import { queries } from '../queries/codigos';
import { QueryBuilder } from '../model/QueryBuilder';
import Mail from '../model/Mail'

export const getCodigo = async (idCodigo: string) => {
    const [result]: any = await ssoDB.query(queries.getCodigo, [idCodigo]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getCodigos = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getCodigos, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const insertCodigo = async (idCredencial: string, tipo: string, medio: string, destinatario: string) => {
    const [result]: any = await ssoDB.query(queries.insertCodigo, [idCredencial, tipo, medio]);
    if (medio === 'Correo') {
        const mail = new Mail();
        let asunto = '';
        let contenido = '';
        if (tipo === 'Validación') {
            asunto = 'Código de validación'
            contenido = `El código de validación es: ${result[0][0].clave}`
        }
        if (tipo === 'Autenticación') {
            asunto = 'Código de autenticación'
            contenido = `El código de autenticación es: ${result[0][0].clave}`
        }
        if (tipo === 'Recuperación') {
            asunto = 'Código de recuperación'
            contenido = `El código de recuperación es: ${result[0][0].clave}`
        }
        mail.enviarCorreo(destinatario, asunto, contenido);
    }
    if (medio === 'Celular') {
        // Anexar el codigo de uso para whatsapp business
    }
    return result[0][0];
}
