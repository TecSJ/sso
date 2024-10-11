import { ssoDB } from '../model/Connection';
import { queries } from '../queries/grupos';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getGrupos = async () => {
    try {
        const [result] = await ssoDB.query(queries.getGrupos);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getGrupo = async (idGrupo: string) => {
    try {
        const [result] = await ssoDB.query(queries.getGrupo, [idGrupo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const filterGrupos = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterGrupos, filtros, orden, limite, pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteGrupo = async (idGrupo: string) => {
    try {
        const [result] = await ssoDB.query(queries.deleteGrupo, [idGrupo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertGrupo = async (clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertGrupo, [clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateGrupo = async (idGrupo: string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateGrupo, [idGrupo, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
