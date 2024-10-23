import { ssoDB } from '../model/Connection';
import { queries } from '../queries/parametros';
import { QueryBuilder } from '../model/QueryBuilder';


export const getParametro = async (idParametro: string) => {
    const [result]: any = await ssoDB.query(queries.getParametro, [idParametro]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getParametros = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getParametros, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const updateParametro = async (idParametro: string, valor: string) => {
    await ssoDB.query(queries.updateParametro, [idParametro, valor]);
    return undefined;
}

