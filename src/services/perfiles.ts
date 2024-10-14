import { ssoDB } from '../model/Connection';
import { queries } from '../queries/perfiles';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getPerfiles = async () => {
    try {
        const [result] = await ssoDB.query(queries.getPerfiles);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getPerfil = async (idPerfil: string) => {
    try {
        const [result] = await ssoDB.query(queries.getPerfil, [idPerfil]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const filterPerfiles = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterPerfiles, filtros, orden, limite, pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertPerfil = async (clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertPerfil, [clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptatePerfil = async (idPerfil: string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updatePerfil, [idPerfil, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deletePerfil = async (idPerfil: string) => {
    try {
        const [result] = await ssoDB.query(queries.deletePerfil, [idPerfil]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
