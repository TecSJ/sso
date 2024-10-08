import { ssoDB } from '../model/Connection';
import { queries } from '../queries/etiquetas';
import { Exception } from '../model/Exception';

export const getEtiquetas = async (idGrupo: string) => {
    try {
        const [result] = await ssoDB.query(queries.getEtiquetas, [idGrupo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getEtiqueta = async (idGrupo: string, idEtiqueta: string) => {
    try {
        const [result] = await ssoDB.query( queries.getEtiqueta, [idGrupo, idEtiqueta]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteEtiqueta = async (idGrupo: string, idEtiqueta: string) => {
    try {
        const [ result] = await ssoDB.query(queries.deleteEtiqueta, [idGrupo, idEtiqueta]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertEtiqueta = async (idGrupo: string, nombre: string) => {
    try {
        const [ result] = await ssoDB.query(queries.insertEtiqueta , [idGrupo, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateEtiqueta = async (idGrupo: string, idEtiqueta: string, nombre: string) => {
    try {
        const [ result] = await ssoDB.query(queries.updateEtiqueta, [idGrupo, idEtiqueta, nombre]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

