import { ssoDB } from '../model/Connection';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getCredencial = async (idCredencial: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getCredencial, [idCredencial]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const getCredenciales = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getCredenciales, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    try {
        await ssoDB.query(queries.deleteCredencial, [idCredencial]);
        return undefined;
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
        return result[0][0];
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const uptateCredencial = async ( idCredencial: string, curp: string, correo: string, celular: string, contrasena: string, tipo: string ) => {
    try {
        const salt = await bcrypt.genSalt(10);
        if( contrasena !== 'N1nguna' ){
            contrasena = await bcrypt.hash(contrasena, salt);
        }
        await ssoDB.query( queries.updateCredencial, [ idCredencial, curp, correo, celular, contrasena, tipo ]);
        return undefined;
    } catch (error: any ) {
        throw new Exception( error.message, error);
    }
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
