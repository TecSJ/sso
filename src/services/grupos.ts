import { ssoDB } from '../model/Connection';
import { queries } from '../queries/grupos';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getGrupo = async (idGrupo: string) => {
    const [result]: any = await ssoDB.query(queries.getGrupo, [idGrupo]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getGrupos = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getGrupos, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteGrupo = async (idGrupo: string) => {
    await ssoDB.query(queries.deleteGrupo, [idGrupo]);
    return undefined;
}

export const insertGrupo = async (clave: string, nombre: string) => {
    const [result]: any = await ssoDB.query(queries.insertGrupo, [clave, nombre]);
    return result[0][0];
}

export const updateGrupo = async (idGrupo: string, clave: string, nombre: string) => {
    const [result] = await ssoDB.query(queries.updateGrupo, [idGrupo, clave, nombre]);
    return undefined;
}
