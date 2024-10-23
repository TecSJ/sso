import { ssoDB } from '../model/Connection';
import { queries } from '../queries/modulos';
import { QueryBuilder } from '../model/QueryBuilder';

export const getModulo = async (idModulo: string) => {
    const [result]: any = await ssoDB.query(queries.getModulo, [idModulo]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getModulos = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getModulos, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteModulo = async (idModulo: string) => {
    await ssoDB.query(queries.deleteModulo, [idModulo]);
    return undefined;
}

export const insertModulo = async (idAplicacion: string, clave: string, nombre: string) => {
    const [result]: any = await ssoDB.query(queries.insertModulo, [idAplicacion, clave, nombre]);
    return result[0][0];
}

export const uptateModulo = async (idModulo: string, clave: string, nombre: string) => {
    await ssoDB.query(queries.updateModulo, [idModulo, clave, nombre]);
    return undefined;
}


