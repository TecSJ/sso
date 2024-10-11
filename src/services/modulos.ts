import { ssoDB } from '../model/Connection';
import { queries } from '../queries/modulos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Exception } from '../model/Exception';

export const getModulos = async () => {
    try {
        const [result] = await ssoDB.query(queries.getModulos);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getModulo = async (idModulo: string) => {
    try {
        const [result] = await ssoDB.query(queries.getModulo, [idModulo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const filterModulos = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterModulos, filtros, orden, limite , pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}


export const insertModulo = async (idAplicacion:string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertModulo, [idAplicacion, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptateModulo = async (idModulo: string, idAplicacion:string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateModulo, [idModulo, idAplicacion, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteModulo = async (idModulo: string) => {
    try {
        const [result] = await ssoDB.query(queries.deleteModulo, [idModulo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
