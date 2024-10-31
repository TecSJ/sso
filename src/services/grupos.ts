import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/grupos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Grupo } from '../types';

export const getGrupo = async (idGrupo: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getGrupo, [idGrupo]);
    return rows[0][0] as Grupo || undefined;
}

export const getGrupos = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Grupo[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getGrupos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Grupo[]) : undefined;
}

export const deleteGrupo = async (idGrupo: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteGrupo, [idGrupo]);
    return result.affectedRows;
}

export const insertGrupo = async (clave: string, nombre: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertGrupo, [clave, nombre]);
    return  rows[0][0] as Grupo || undefined;
}

export const updateGrupo = async (idGrupo: string, clave: string, nombre: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateGrupo, [idGrupo, clave, nombre]);
    return  rows[0][0] as Grupo || undefined;
}
