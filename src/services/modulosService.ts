import { ssoDB } from '../database/connection';
import { queries } from '../database/modulosQueries';

export const getAllModulos = async () => {
    try {
        const db = await ssoDB();
        const [modulos] = await db.execute(queries.getAllModulos);
        return modulos;
    } catch (error) {
        console.log(error);
    }
}

export const getModuloById = async (idModulo: number) => {
    try {
        const db = await ssoDB();
        const [modulos] = await db.execute(queries.getModuloById, [idModulo]);
        return modulos;
    } catch (error) {
        console.log(error);
    }
}

export const insertModulo = async (clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [modulos] = await db.execute(queries.insertModulo, [clave, nombre]);
        return modulos;
    } catch (error) {
        console.log(error);
    }
}

export const uptateModulo = async (idModulo: number, clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [modulos] = await db.execute(queries.updateModulo, [idModulo, clave, nombre]);
        return modulos;
    } catch (error) {
        console.log(error);
    }
}

export const deleteModulo = async (idModulo: number) => {
    try {
        const db = await ssoDB();
        const [modulos] = await db.execute(queries.deleteModulo, [idModulo]);
        return modulos;
    } catch (error) {
        console.log(error);
    }
}