import { ssoDB } from '../model/Connection';
import { queries } from '../queries/perfiles';
import { QueryBuilder } from '../model/QueryBuilder';

export const getPerfil = async (idRol: string) => {
    const [result]: any = await ssoDB.query(queries.getPerfil, [idRol]);
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const getPerfiles = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getPerfiles, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deletePerfil = async (idRol: string, idCredencial: string) => {
    await ssoDB.query(queries.deletePerfil, [idRol, idCredencial]);
    return undefined;
}


export const insertPerfil = async (clave: string, nombre: string) => {
    const [result]: any = await ssoDB.query(queries.insertPerfil, [clave, nombre]);
    return result[0][0];
}


