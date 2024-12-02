import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/miembros';
import { QueryBuilder } from '../model/QueryBuilder';
import { Miembro } from '../types';

export const getMiembro = async (idMiembro: string): Promise<Miembro | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getMiembro, [idMiembro]);
    return rows[0][0] as Miembro || undefined;
}

export const getMiembros = async (filtros?: string, orden?: string, limite?: number, pagina?: number) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getMiembros, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Miembro[]) : undefined;
}

export const deleteMiembro = async (idGrupo: string, idCredencial: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteMiembro, [idGrupo, idCredencial]);
    return result.affectedRows;
}

export const insertMiembro = async (idGrupo: string, idCredencial: string) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertMiembro, [idGrupo, idCredencial]);
    return  rows[0][0] as Miembro || undefined;
}
