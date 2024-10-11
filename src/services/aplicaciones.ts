import { ssoDB } from '../model/Connection';
import { queries } from '../queries/aplicaciones';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getAplicaciones = async () => {
    try {
        const [ result ] = await ssoDB.query(queries.getAplicaciones);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const getAplicacion = async ( idAplicacion: string ) => {
    try {
        const [ result ] = await ssoDB.query(queries.getAplicacion, [idAplicacion]);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const filterAplicaciones = async ( filtros: string | undefined, orden: string | undefined, limite : number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterAplicaciones, filtros, orden, limite, pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteAplicacion = async (idAplicacion: string) => {
    try {
        const [ result ] = await ssoDB.query(queries.deleteAplicacion, [idAplicacion]);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const insertAplicacion = async ( clave: string, nombre: string, redireccion: string ) => {
    try {
        const [ result ] = await ssoDB.query(queries.insertAplicacion , [clave, nombre, redireccion]);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const updateAplicacion = async ( idAplicacion: string, clave: string, nombre: string, redireccion: string ) => {
    try {
        const [ result ] = await ssoDB.query(queries.updateAplicacion, [idAplicacion, clave, nombre, redireccion]);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

