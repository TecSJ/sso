import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/parametros';
import { QueryBuilder } from '../model/QueryBuilder';
import { Parametro  } from '../types';


export const getParametro = async (idParametro: string) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getParametro, [idParametro]);
    return rows[0] as Parametro || undefined;
}

export const getParametros = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Parametro[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getParametros, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Parametro[]) : undefined;
}

export const updateParametro = async (idParametro: string, valor: string): Promise<Parametro | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateParametro, [idParametro, valor]);
    return  rows[0] as Parametro || undefined;
}

