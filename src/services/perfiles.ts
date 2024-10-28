import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/perfiles';
import { QueryBuilder } from '../model/QueryBuilder';
import { Perfil } from '../types';

export const getPerfil = async (idRol: string) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>( queries.getPerfil, [idRol]);
    return rows[0] as Perfil || undefined;
}

export const getPerfiles = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getPerfiles, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Perfil[]) : undefined;
}

export const deletePerfil = async (idRol: string, idCredencial: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deletePerfil, [idRol, idCredencial]);
    return result.affectedRows;
}


export const insertPerfil = async (clave: string, nombre: string): Promise<Perfil | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertPerfil, [clave, nombre]);
    return  rows[0] as Perfil || undefined;
}


