import { ssoDB } from '../database/connection';
import { queries } from '../database/rolesQueries';
import { Exception } from '../util/Exception';

export const getRoles = async () => {
    try {
        const [roles] = await ssoDB.query(queries.getRoles);
        return roles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getRol = async (idRol: string) => {
    try {
        const [roles] = await ssoDB.query(queries.getRol, [idRol]);
        return roles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteRol = async (idRol: string) => {
    try {
        const [rol] = await ssoDB.query(queries.deleteRol, [idRol]);
        return rol;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertRol = async (clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertRol, [clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateRol = async (idRol: string, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateRol, [idRol, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
