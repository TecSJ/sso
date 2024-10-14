import { ssoDB } from '../model/Connection';
import { queries } from '../queries/roles';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getRol = async (idRol: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getRol, [idRol]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getRoles = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getRoles, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteRol = async (idRol: string) => {
    try {
        await ssoDB.query(queries.deleteRol, [idRol]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertRol = async (clave: string, nombre: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertRol, [clave, nombre]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateRol = async (idRol: string, clave: string, nombre: string) => {
    try {
        await ssoDB.query(queries.updateRol, [idRol, clave, nombre]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
