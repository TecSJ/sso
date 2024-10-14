import { ssoDB } from '../model/Connection';
import { queries } from '../queries/miembros';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';

export const getMiembro = async ( idMiembro: string) => {
    try {
        const [result]: any = await ssoDB.query( queries.getMiembro, [ idMiembro ]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const getMiembros = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getMiembros, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteMiembro = async ( idMiembro: string) => {
    try {
        await ssoDB.query(queries.deleteMiembro, [idMiembro]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertMiembro = async (idGrupo: string, idCredencial: string) => {
    try {
        const [ result]: any = await ssoDB.query(queries.insertMiembro , [idGrupo, idCredencial]);
        return result[0][0];
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateMiembro = async ( idMiembro: string, idGrupo: string ) => {
    try {
        await ssoDB.query(queries.updateMiembro, [ idMiembro, idGrupo ]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

