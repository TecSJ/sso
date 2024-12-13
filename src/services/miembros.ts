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

export const insertMiembro = async (seleccionado: number, idCredencial: string, idGrupo: string) => {
    const connection = await ssoDB.getConnection();
    try {
        const estatusDb = seleccionado === 1 ? "Activo" : "Inactivo";
        const [existingRows] = await connection.query<RowDataPacket[]>( 
            'SELECT estado FROM Miembros WHERE idCredencial = ? AND idGrupo = ?',
            [idCredencial, idGrupo]
        );
        const currentStatusDB = existingRows.length > 0 ? existingRows[0].estado : null;
        if (currentStatusDB === estatusDb) {
            return undefined;
        }
        if (currentStatusDB === "Activo" && estatusDb === "Inactivo") {
            const [result]: any = await connection.query(queries.deleteMiembro, [idGrupo, idCredencial]);
            return result.affectedRows;
        }
        if (currentStatusDB === null && estatusDb === "Activo") {
            await connection.query(queries.insertMiembro, [idGrupo, idCredencial]);
        }
        const [updatedRows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM Miembros WHERE idCredencial = ? AND idGrupo = ?',
            [idCredencial, idGrupo]
        );
        return updatedRows.length > 0 ? (updatedRows[0] as Miembro) : undefined;
    } catch (error) {
        console.error("Error en upsertMiembro:", error);
        throw error;
    } finally {
        connection.release();
    }
};