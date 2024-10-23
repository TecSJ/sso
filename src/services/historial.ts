import { ssoDB } from '../model/Connection';
import { queries } from '../queries/historial';
import { QueryBuilder } from '../model/QueryBuilder';

export const getHistorial = async (idCredencial: string) => {
    const [result]: any = await ssoDB.query(queries.getHistorial, [idCredencial]);
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const getBitacora = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getBitacora, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const insertHistorial = async (idCredencial: string, aplicacion: string, modulo: string, accion: string, recurso: string, tipo: string) => {
    const [result]: any = await ssoDB.query(queries.insertHistorial, [idCredencial, aplicacion, modulo, accion, recurso, tipo]);
    return result[0][0];
}


