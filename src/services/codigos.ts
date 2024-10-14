import { ssoDB } from '../model/Connection';
import { queries } from '../queries/codigos';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getCodigos = async () => {
    try {
        const [result] = await ssoDB.query(queries.getCodigos);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getCodigo = async (idCodigo: string) => {
    try {
        const [result] = await ssoDB.query(queries.getCodigo, [idCodigo]);
        return result;
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const filterCodigos = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result] = await ssoDB.query( QueryBuilder.getQuery( queries.filterCodigos, filtros, orden, limite, pagina ) );
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteCodigo = async (idCodigo: string) => {
    try {
        const [result] = await ssoDB.query(queries.deletCodigo, [idCodigo]);
        return result;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertCodigo = async ( idCredencial: string, clave: string, tipo: string, caducidad: string ) => {
    try {
        const [result] = await ssoDB.query( queries.insertCodigo, [idCredencial,clave,tipo,caducidad]);
        return result;
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const uptateCodigo = async ( idCodigo: string, idCredencial: string, clave: string, tipo: string, caducidad: string ) => {
    try {
        const [result] = await ssoDB.query(queries.updateCodigo, [idCodigo, idCredencial, clave, tipo, caducidad ]);
        return result;
    } catch (error: any ) {
        throw new Exception( error.message, error);
    }
}
