import { ssoDB } from '../model/Connection';
import { queries } from '../queries/accesos';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getAcceso = async ( idRol: string, idModulo: string) => {
    try {
        const [result]: any = await ssoDB.query( queries.getAcceso, [ idRol, idModulo ]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getAccesos = async ( filtros: string | undefined, orden: string | undefined, limite : number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getAccesos, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteAcceso = async ( idRol: string, idModulo: string ) => {
    try {
        await ssoDB.query(queries.deleteAcceso, [ idRol, idModulo]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertAcceso = async ( idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertAcceso, [ idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateAcceso = async ( idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    try {
        await ssoDB.query(queries.updateAcceso, [ idRol, idModulo, accion1, accion2, accion3, accion4, accion5 ]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}