import { ssoDB } from '../model/Connection';
import { queries } from '../queries/accesos';
import { QueryBuilder } from '../model/QueryBuilder';

export const getAcceso = async (idRol: string, idModulo: string) => {
    const [result]: any = await ssoDB.query(queries.getAcceso, [idRol, idModulo]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getAccesos = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getAccesos, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteAcceso = async (idRol: string, idModulo: string) => {
    await ssoDB.query(queries.deleteAcceso, [idRol, idModulo]);
    return undefined;
}

export const insertAcceso = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    const [result]: any = await ssoDB.query(queries.insertAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
    return result[0][0];
}

export const updateAcceso = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    await ssoDB.query(queries.updateAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
    return undefined;
}