import { ssoDB } from '../database/connection';
import { queries } from '../database/modulosQueries';
import { Exception } from '../util/Exception';

export const getModulos = async () => {
    try {
        const [modulos] = await ssoDB.query(queries.getModulos);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getModulo = async (idModulo: number) => {
    try {
        const [modulos] = await ssoDB.query(queries.getModulo, [idModulo]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertModulo = async (idAplicacion:number, clave: string, nombre: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.insertModulo, [idAplicacion, clave, nombre]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptateModulo = async (idModulo: number, idAplicacion:number, clave: string, nombre: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.updateModulo, [idModulo, idAplicacion, clave, nombre]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteModulo = async (idModulo: number) => {
    try {
        const [modulos] = await ssoDB.query(queries.deleteModulo, [idModulo]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
