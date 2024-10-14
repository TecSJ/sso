import { ssoDB } from '../model/Connection';
import { queries } from '../queries/grupos';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getGrupo = async (idGrupo: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getGrupo, [idGrupo]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getGrupos = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getGrupos, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }

    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteGrupo = async (idGrupo: string) => {
    try {
        await ssoDB.query(queries.deleteGrupo, [idGrupo]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertGrupo = async (clave: string, nombre: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertGrupo, [clave, nombre]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateGrupo = async (idGrupo: string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateGrupo, [idGrupo, clave, nombre]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
