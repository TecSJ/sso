import { ssoDB } from '../model/Connection';
import { queries } from '../queries/roles';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

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

export const filterRoles = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [modulos] = await ssoDB.query( QueryBuilder.getQuery( queries.filterRoles, filtros, orden, limite, pagina ) );
        return modulos;
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
