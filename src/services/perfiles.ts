import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/perfiles';
import { QueryBuilder } from '../model/QueryBuilder';
import { Perfil } from '../types';

export const getPerfil = async (idRol: string) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>( queries.getPerfil, [idRol]);
    return rows[0][0] as Perfil || undefined;
}

export const getPerfiles = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getPerfiles, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Perfil[]) : undefined;
}

export const deletePerfil = async (idRol: string, idCredencial: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deletePerfil, [idRol, idCredencial]);
    return result.affectedRows;
}

export const upsertPerfil = async (estatus: string, idRol: string, idCredencial: string): Promise<Perfil | undefined> => {
    const connection = await ssoDB.getConnection();
    try {
        const [existingRows] = await connection.query<RowDataPacket[]>(
            'SELECT estado FROM Perfiles WHERE idCredencial = ? AND idRol = ?',
            [idCredencial, idRol]
        );
        const currentStatusDB = existingRows.length > 0 ? existingRows[0].estado : null;
        if (currentStatusDB === estatus) {
            return undefined;
        }
        if (currentStatusDB === "Activo" && estatus === "Inactivo") {
            const [result]: any = await connection.query(queries.deletePerfil, [idRol, idCredencial]);
            return result.affectedRows;
        }
        if (currentStatusDB === null && estatus === "Activo") {
            await connection.query(queries.insertPerfil, [idRol, idCredencial]);
        }
        const [updatedRows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM Perfiles WHERE idCredencial = ? AND idRol = ?',
            [idCredencial, idRol]
        );
        return updatedRows.length > 0 ? (updatedRows[0] as Perfil) : undefined;
    } catch (error) {
        console.error("Error en upsertPerfil:", error);
        throw error;
    } finally {
        connection.release();
    }
};