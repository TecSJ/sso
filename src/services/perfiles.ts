import { ssoDB } from '../model/Connection';
import { queries } from '../queries/perfiles';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getPerfil = async ( idRol: string) => {
    try {
        const [result]: any = await ssoDB.query( queries.getPerfil, [idRol]);
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getPerfiles = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getPerfiles, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deletePerfil = async ( idRol: string, idCredencial: string ) => {
    try {
        await ssoDB.query( queries.deletePerfil, [ idRol,idCredencial ]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}


export const insertPerfil = async (clave: string, nombre: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertPerfil, [clave, nombre]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}


