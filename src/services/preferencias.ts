import { ssoDB } from '../model/Connection';
import { queries } from '../queries/preferencias';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

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

export const filterPreferencias = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterPreferencias, filtros, orden, limite, pagina ) );
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