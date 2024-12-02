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

export const addEtiquetas = async ( idCredencial: string, etiquetas: string[]): Promise<Etiqueta[] | undefined> => {
    const connection = await ssoDB.getConnection();
    const insertedEtiquetas: Etiqueta[] = [];
    try {
        await connection.beginTransaction();
        const [existingRows] = await connection.query<RowDataPacket[]>('SELECT * FROM Etiquetas WHERE idCredencial = ? and estado = "Activo" ',[idCredencial]);
        const existingEtiquetas = existingRows.map((row: any) => row.nombre);
        const etiquetasToInsert = etiquetas.filter((etiqueta) => !existingEtiquetas.includes(etiqueta));
        const etiquetasToDelete = existingEtiquetas.filter((etiqueta: string) => !etiquetas.includes(etiqueta));
        for (const etiqueta of etiquetasToInsert) {
            const [rows] = await connection.query<RowDataPacket[]>(queries.insertEtiquetas,[idCredencial, etiqueta]);
            if (!rows || rows.length === 0) {
                throw new Error(`Error al insertar la etiqueta: ${etiqueta}`);
            }
            const insertedEtiqueta = rows[0][0] as Etiqueta;
            insertedEtiquetas.push(insertedEtiqueta);
        }
        for (const etiqueta of etiquetasToDelete) {
            await connection.query(queries.deleteEtiquetas, [idCredencial, etiqueta ]);
        }
        await connection.commit();
        const [rows] = await ssoDB.query<RowDataPacket[]>('SELECT * FROM Etiquetas WHERE idCredencial = ? AND estado = "Activo" ', [idCredencial]);
        return rows.length > 0 ? (rows as Etiqueta[]) : undefined;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}