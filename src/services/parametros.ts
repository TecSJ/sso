import { ssoDB } from '../model/Connection';
import { queries } from '../queries/parametros';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';


export const getParametro = async ( idParametro: string ) => {
    try {
        const [ result ]: any = await ssoDB.query(queries.getParametro, [idParametro]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

export const getParametros = async ( filtros: string | undefined, orden: string | undefined, limite : number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getParametros, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updateParametro = async ( idParametro: string, valor: string ) => {
    try {
        await ssoDB.query(queries.updateParametro, [idParametro, valor]);
        return undefined;
    } catch (error : any ) {
        throw new Exception(error.message, error);
    }
}

