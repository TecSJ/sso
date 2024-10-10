import { ssoDB } from '../model/Connection';
import { queries } from '../queries/modulos';
import { Exception } from '../model/Exception';

export const getModulos = async () => {
    try {
        const [modulos] = await ssoDB.query(queries.getModulos);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getModulo = async (idModulo: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.getModulo, [idModulo]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertModulo = async (idAplicacion:string, clave: string, nombre: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.insertModulo, [idAplicacion, clave, nombre]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const uptateModulo = async (idModulo: string, idAplicacion:string, clave: string, nombre: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.updateModulo, [idModulo, idAplicacion, clave, nombre]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteModulo = async (idModulo: string) => {
    try {
        const [modulos] = await ssoDB.query(queries.deleteModulo, [idModulo]);
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
