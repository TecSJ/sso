import { ssoDB } from '../model/Connection';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getCredenciales = async () => {
    try {
        const [credenciales] = await ssoDB.query(queries.getCredenciales);
        return credenciales;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getCredencial = async (idCredencial: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.getCredencial, [idCredencial]);
        return credenciales;
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const filterCredenciales = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [modulos] = await ssoDB.query( QueryBuilder.getQuery( queries.filterCredenciales, filtros, orden, limite, pagina ) );
        return modulos;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}


export const insertCredencial = async (curp: string, usuario: string, correo: string, celular: string, contrasena: string) => {
    try {
        const uuid = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [credenciales] = await ssoDB.query(queries.insertCredencial, [uuid, curp, usuario, correo, celular, criptContrasena]);
        return credenciales;
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const uptateCredencial = async (idCredencial: string, usuario: string, correo: string, celular: string, tipo: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.updateCredencial, [idCredencial, usuario, correo, celular, tipo]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [credenciales] = await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return credenciales;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.deleteCredencial, [idCredencial]);
        return credenciales;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}