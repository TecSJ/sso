import { ssoDB } from '../database/connection';
import { queries } from '../database/aplicacionesQueries';

export const getAllAplicaciones = async () => {
    try {
        const db = await ssoDB();
        const [aplicaciones]=await db.execute(queries.getAllAplicaciones);
        console.log(aplicaciones);
        return aplicaciones;
    } catch (error) {

    }
}

export const getAplicacionById = async (idAplicacion: number) => {
    try {
        const db = await ssoDB();
        const [aplicaciones]=await db.execute(queries.getAplicacionById, [idAplicacion]);
        console.log(aplicaciones);
        return aplicaciones;
    } catch (error) {

    }
}

export const deleteAplicacionById = async (idAplicacion: number) => {
    try {
        const db = await ssoDB();
        const [aplicacion]=await db.execute(queries.deleteAplicacionById, [idAplicacion]);
        console.log(aplicacion);
        return aplicacion;
    } catch (error) {

    }
}

export const insertAplicacion = async (clave: string, nombre: string, redireccion: string, estado: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.insertAplicacion, [clave, nombre, redireccion, estado]);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const updateAplicacionById = async (idAplicacion: number, clave: string, nombre: string, redireccion: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.updateAplicacionById, [idAplicacion, clave, nombre, redireccion]);
        return result;
    } catch (error) {
        console.error(error);
    }
}

