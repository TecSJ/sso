import { ssoDB } from '../queries/connection';
import { queries } from '../queries/accesos';
import { Exception } from '../util/Exception';

export const getAccesos = async () => {
    try {
        const [result] = await ssoDB.query(queries.getAccesos);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getAcceso = async (idAcceso: string) => {
    try {
        const [result] = await ssoDB.query(queries.getAcceso, [idAcceso]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteAcceso = async (idAcceso: string) => {
    try {
        const [result] = await ssoDB.query(queries.deleteAcceso, [idAcceso]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertAcceso = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateAcceso = async (idAcceso: string, idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateAcceso, [idAcceso, idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}