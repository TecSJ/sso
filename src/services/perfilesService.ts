import { ssoDB } from '../database/connection';
import { queries } from '../database/perfilesQueries';
import { Exception } from '../util/Exception';

export const getPerfiles = async () => {
    try {
        const [perfiles] = await ssoDB.query(queries.getPerfiles);
        return perfiles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getPerfil = async (idPerfil: string) => {
    try {
        const [perfiles] = await ssoDB.query(queries.getPerfil, [idPerfil]);
        return perfiles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertPerfil = async (clave: string, nombre: string) => {
    try {
        const [perfiles] = await ssoDB.query(queries.insertPerfil, [clave, nombre]);
        return perfiles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptatePerfil = async (idPerfil: string, clave: string, nombre: string) => {
    try {
        const [perfiles] = await ssoDB.query(queries.updatePerfil, [idPerfil, clave, nombre]);
        return perfiles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deletePerfil = async (idPerfil: string) => {
    try {
        const [perfiles] = await ssoDB.query(queries.deletePerfil, [idPerfil]);
        return perfiles;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
