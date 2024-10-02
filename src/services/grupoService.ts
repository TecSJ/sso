import { ssoDB } from '../database/connection';
import { queries } from '../database/gruposQueries';

export const getAllGrupos = async () => {
    try {
        const db = await ssoDB();
        const [grupos]=await db.execute(queries.getAllGrupos);
        console.log(grupos);
        return grupos;
    } catch (error) {

    }
}

export const getGrupoById = async (idGrupo: number) => {
    try {
        const db = await ssoDB();
        const [grupo]=await db.execute(queries.getGrupoById, [idGrupo]);
        console.log(grupo);
        return grupo;
    } catch (error) {

    }
}

export const deleteOneGrupo = async (idGrupo: number) => {
    try {
        const db = await ssoDB();
        const [grupo]=await db.execute(queries.deleteGrupoById, [idGrupo]);
        console.log(grupo);
        return grupo;
    } catch (error) {

    }
}

export const insertGrupo = async (clave: string, nombre: string, estado: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.insertGrupo, [clave, nombre, estado]);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const updateGrupo = async (idGrupo: number, clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [result] = await db.execute(queries.updateGrupoById, [idGrupo, clave, nombre]);
        return result;
    } catch (error) {
        console.error(error);
    }
}
