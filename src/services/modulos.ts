import { ssoDB } from '../model/Connection';
import { queries } from '../queries/modulos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Exception } from '../model/Exception';

export const getModulo = async (idModulo: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getModulo, [idModulo]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getModulos = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getModulos, filtros, orden, limite , pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteModulo = async (idModulo: string) => {
    try {
        await ssoDB.query(queries.deleteModulo, [idModulo]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertModulo = async (idAplicacion:string, clave: string, nombre: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertModulo, [idAplicacion, clave, nombre]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptateModulo = async (idModulo: string, clave: string, nombre: string) => {
    try {
        await ssoDB.query(queries.updateModulo, [idModulo, clave, nombre]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}


