import { ssoDB } from '../model/Connection';
import { queries } from '../queries/roles';
import { QueryBuilder } from '../model/QueryBuilder';

export const getRol = async (idRol: string) => {
    const [result]: any = await ssoDB.query(queries.getRol, [idRol]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getRoles = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getRoles, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteRol = async (idRol: string) => {
    await ssoDB.query(queries.deleteRol, [idRol]);
    return undefined;
}

export const insertRol = async (clave: string, nombre: string) => {
    const [result]: any = await ssoDB.query(queries.insertRol, [clave, nombre]);
    return result[0][0];
}

export const updateRol = async (idRol: string, clave: string, nombre: string) => {
    await ssoDB.query(queries.updateRol, [idRol, clave, nombre]);
    return undefined;
}
