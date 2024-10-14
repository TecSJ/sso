import { ssoDB } from '../model/Connection';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getCredenciales = async () => {
    try {
        const [result] = await ssoDB.query(queries.getCredenciales);
        return result;
        const [result] = await ssoDB.query(queries.getCredenciales);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getCredencial = async (idCredencial: string) => {
    try {
        const [result] = await ssoDB.query(queries.getCredencial, [idCredencial]);
        return result;
        const [result] = await ssoDB.query(queries.getCredencial, [idCredencial]);
        return result;
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const filterCredenciales = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const query = QueryBuilder.getQuery( queries.filterCredenciales, filtros, orden, limite, pagina ) ;
        console.log( query );
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterCredenciales, filtros, orden, limite, pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    try {
        const [result] = await ssoDB.query(queries.deleteCredencial, [idCredencial]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertCredencial = async (curp: string, correo: string, celular: string, contrasena: string, tipo: string ) => {
    try {
        const idCredencial = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [result]: any = await ssoDB.query(queries.insertCredencial, [ idCredencial, curp, correo, celular, criptContrasena, tipo ]);
        return { "idCredencial": idCredencial };
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const uptateCredencial = async ( idCredencial: string, curp: string, celular: string, contrasena: string, tipo: string ) => {
    try {
        const salt = await bcrypt.genSalt(10);
        if( contrasena !== 'N1nguna' ){
            contrasena = await bcrypt.hash(contrasena, salt);
        }
        const [result] = await ssoDB.query( queries.updateCredencial, [ idCredencial, curp, celular, contrasena, tipo ]);
        return result;
    } catch (error: any ) {
        throw new Exception( error.message, error);
    }
}

export const getCodigo = async ( idCredencial: string, medio: string ) => {
    try {
        const [result] = await ssoDB.query( queries.getCodigo, [ idCredencial, medio]);
        console.log(result)
        return result;
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const insertCodigo = async ( idCredencial: string, medio: string ) => {
    try {
        const [result]: any = await ssoDB.query(queries.insertCodigo, [ idCredencial, medio ]);
        return result;
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [result] = await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return result;
        const [result] = await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
