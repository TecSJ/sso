import { ssoDB } from '../model/Connection';
import { queries } from '../queries/etiquetas';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getEtiqueta = async ( idEtiqueta: string) => {
    try {
        const [result]: any = await ssoDB.query( queries.getEtiqueta, [ idEtiqueta ]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getEtiquetas = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getEtiquetas, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteEtiqueta = async ( idEtiqueta: string) => {
    try {
        await ssoDB.query(queries.deleteEtiqueta, [idEtiqueta]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertEtiqueta = async (idGrupo: string, nombre: string) => {
    try {
        const [ result]: any = await ssoDB.query(queries.insertEtiqueta , [idGrupo, nombre]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateEtiqueta = async ( idEtiqueta: string, nombre: string) => {
    try {
        await ssoDB.query(queries.updateEtiqueta, [ idEtiqueta, nombre]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

