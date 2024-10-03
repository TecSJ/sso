import { ssoDB } from '../database/connection';
import { queries } from '../database/perfilesQueries';

export const getAllPerfiles = async () => {
    try {
        const db = await ssoDB();
        const [perfiles] = await db.execute(queries.getAllPerfiles);
        return perfiles;
    } catch (error) {
        console.log(error);
    }
}

export const getPerfilById = async (idPerfil: number) => {
    try {
        const db = await ssoDB();
        const [perfiles] = await db.execute(queries.getPerfilById, [idPerfil]);
        return perfiles;
    } catch (error) {
        console.log(error);
    }
}

export const insertPerfil = async (clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [perfiles] = await db.execute(queries.insertPerfil, [clave, nombre]);
        return perfiles;
    } catch (error) {
        console.log(error);
    }
}

export const uptatePerfil = async (idPerfil: number, clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [perfiles] = await db.execute(queries.updatePerfil, [idPerfil, clave, nombre]);
        return perfiles;
    } catch (error) {
        console.log(error);
    }
}

export const deletePerfil = async (idPerfil: number) => {
    try {
        const db = await ssoDB();
        const [perfiles] = await db.execute(queries.deletePerfil, [idPerfil]);
        return perfiles;
    } catch (error) {
        console.log(error);
    }
}