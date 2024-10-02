import { ssoDB } from '../database/connection';
import { queries } from '../database/rolesQueries';

export const getAllRoles = async () => {
    try {
        const db = await ssoDB();
        const [roles]=await db.execute(queries.getAllRoles);
        console.log(roles);
        return roles;
    } catch (error) {

    }
}

export const getRolById = async (idRol: number) => {
    try {
        const db = await ssoDB();
        const [roles]=await db.execute(queries.getRolById, [idRol]);
        console.log(roles);
        return roles;
    } catch (error) {

    }
}

export const deleteRolById = async (idRol: number) => {
    try {
        const db = await ssoDB();
        const [rol]=await db.execute(queries.deleteRolById, [idRol]);
        console.log(rol);
        return rol;
    } catch (error) {

    }
}

export const insertRol = async (clave: string, nombre: string, estado: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.insertRol, [clave, nombre, estado]);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const updateRolById = async (idRol: number, clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.updateRolById, [idRol, clave, nombre]);
        return result;
    } catch (error) {
        console.error(error);
    }
}
