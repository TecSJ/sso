import { ssoDB } from '../database/connection';
import { queries } from '../database/gruposQueries';
import { Exception } from '../util/Exception';

export const getGrupos = async () => {
    try {
        const [grupos] = await ssoDB.query(queries.getGrupos);
        return grupos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getGrupo = async (idGrupo: number) => {
    try {
        const [grupo] = await ssoDB.query(queries.getGrupo, [idGrupo]);
        return grupo;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteGrupo = async (idGrupo: number) => {
    try {
        const [grupo] = await ssoDB.query(queries.deleteGrupo, [idGrupo]);
        return grupo;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertGrupo = async (clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertGrupo, [clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateGrupo = async (idGrupo: number, clave: string, nombre: string) => {
    try {
        const [result] = await ssoDB.query(queries.updateGrupo, [idGrupo, clave, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
