import { ssoDB } from '../database/connection';
import { queries } from '../database/credencialesQueries';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

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


export const insertCredencial = async (curp: string, usuario: string, correo: string, celular: string, contrasena: string) => {
    try {
        const db = await ssoDB();
        const uuid = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [credenciales] = await db.execute(queries.insertCredencial, [uuid, curp, usuario, correo, celular, criptContrasena]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const uptateCredencial = async (idCredencial: string, usuario: string, correo: string, celular: string, tipo: string) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.updateCredencial, [idCredencial, usuario, correo, celular, tipo]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const uptateContrasena = async (idCredencial: number, contrasena: string) => {
    try {
        const db = await ssoDB();
        const [credenciales] = await db.execute(queries.updateContrasena, [idCredencial, contrasena]);
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