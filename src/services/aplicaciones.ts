import { ssoDB } from '../model/Connection';
import { queries } from '../queries/aplicaciones';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';


export const getAplicacion = async ( idAplicacion: string ) => {
    try {
        const [ result ]: any = await ssoDB.query(queries.getAplicacion, [idAplicacion]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const getAplicaciones = async ( filtros: string | undefined, orden: string | undefined, limite : number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getAplicaciones, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteAplicacion = async (idAplicacion: string) => {
    try {
        await ssoDB.query(queries.deleteAplicacion, [idAplicacion]);
        return undefined;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const insertAplicacion = async ( clave: string, nombre: string, redireccion: string ) => {
    try {
        const [ result ] : any  = await ssoDB.query(queries.insertAplicacion , [clave, nombre, redireccion]);
        return result[0][0];
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const updateAplicacion = async ( idAplicacion: string, clave: string, nombre: string, redireccion: string ) => {
    try {
        await ssoDB.query(queries.updateAplicacion, [idAplicacion, clave, nombre, redireccion]);
        return undefined;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

