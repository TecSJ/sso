import { ssoDB } from '../model/Connection';
import { queries } from '../queries/preferencias';
import { Exception } from '../model/Exception';

export const getPreferencias = async () => {
    try {
        const [result] = await ssoDB.query(queries.getPreferencias);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getPreferencia = async (idPreferencia: string) => {
    try {
        const [result] = await ssoDB.query(queries.getPreferencia, [idPreferencia]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deletePreferencia = async (idPreferencia: string) => {
    try {
        const [result] = await ssoDB.query(queries.deletePreferencia, [idPreferencia]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertPreferencia = async (idCredencial: string, twoNF: string, cambiarContrasena: string) => {
    try {
        const [result] = await ssoDB.query(queries.insertPreferencia, [idCredencial, twoNF, cambiarContrasena]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updatePreferencia = async (idPreferencia: string, idCredencial: string, twoNF: string, cambiarContrasena: string) => {
    try {
        const [result] = await ssoDB.query(queries.updatePreferencia, [idPreferencia, idCredencial, twoNF, cambiarContrasena]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}