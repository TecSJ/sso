import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/etiquetas';
import { QueryBuilder } from '../model/QueryBuilder';
import { Etiqueta } from '../types';

export const getEtiqueta = async (idEtiqueta: string): Promise<Etiqueta | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getEtiqueta, [idEtiqueta]);
    return rows[0][0] as Etiqueta || undefined;
}

export const getEtiquetas = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Etiqueta[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getEtiquetas, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Etiqueta[]) : undefined;
}

export const deleteEtiqueta = async (idEtiqueta: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteEtiqueta, [idEtiqueta]);
    return result.affectedRows;
}

export const insertEtiqueta = async (idGrupo: string, nombre: string): Promise<Etiqueta | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertEtiqueta, [idGrupo, nombre]);
    return  rows[0][0] as Etiqueta || undefined;
}

export const updateEtiqueta = async (idEtiqueta: string, nombre: string): Promise<Etiqueta | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateEtiqueta, [idEtiqueta, nombre]);
    return  rows[0][0] as Etiqueta || undefined;
}

