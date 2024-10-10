import { ssoDB } from '../database/connection';
import { queries } from '../database/aplicacionesQueries';
import { Exception } from '../util/Exception';

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
        const [ result ] = await ssoDB.query(queries.updateAplicacionById, [idAplicacion, clave, nombre, redireccion]);
        return result;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

