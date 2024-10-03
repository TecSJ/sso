import { ssoDB } from '../database/connection';
import { queries } from '../database/credencialesQueries';

export const getAllCredenciales = async () => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.getAllCredenciales);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const getCredencialById = async (idCredencial: number) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.getCredencialById, [idCredencial]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const insertCredencial = async (clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.insertCredencial, [clave, nombre]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const uptateCredencial = async (idCredencial: number, clave: string, nombre: string) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.updateCredencial, [idCredencial, clave, nombre]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCredencial = async (idCredencial: number) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.deleteCredencial, [idCredencial]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}