import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/modulos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Modulo } from '../types';

export const getModulo = async (idModulo: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getModulo, [idModulo]);
    return rows[0] as Modulo || undefined;
}

export const getModulos = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Modulo[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getModulos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Modulo[]) : undefined;
}

export const deleteModulo = async (idModulo: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteModulo, [idModulo]);
    return result.affectedRows;
}

export const insertModulo = async (idAplicacion: string, clave: string, nombre: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertModulo, [idAplicacion, clave, nombre]);
    return  rows[0] as Modulo || undefined;
}

export const uptateModulo = async (idModulo: string, clave: string, nombre: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateModulo, [idModulo, clave, nombre]);
    return  rows[0] as Modulo || undefined;
}


