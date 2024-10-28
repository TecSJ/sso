import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/roles';
import { QueryBuilder } from '../model/QueryBuilder';
import { Rol } from '../types';

export const getRol = async (idRol: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getRol, [idRol]);
    return rows[0] as Rol || undefined;
}

export const getRoles = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Rol[] | undefined>=> {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getRoles, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Rol[]) : undefined;
}

export const deleteRol = async (idRol: string) => {
    const [result]: any = await ssoDB.query(queries.deleteRol, [idRol]);
    return result.affectedRows;
}

export const insertRol = async (clave: string, nombre: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertRol, [clave, nombre]);
    return  rows[0] as Rol || undefined;
}

export const updateRol = async (idRol: string, clave: string, nombre: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateRol, [idRol, clave, nombre]);
    return  rows[0] as Rol || undefined;
}
