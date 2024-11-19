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

export const deleteEtiqueta = async (idEtiqueta: number[]): Promise<number> => {
    const [result]: any = await ssoDB.query(
        'UPDATE Etiquetas SET estado = "Inactivo" WHERE idEtiqueta IN (?)',
        [idEtiqueta]);
    return result.affectedRows;
}

export const insertEtiquetas = async ( idGrupo: string, etiquetas: string[]): Promise<Etiqueta[] | undefined> => {
    const connection = await ssoDB.getConnection();
    const insertedEtiquetas: Etiqueta[] = [];
    try {
        await connection.beginTransaction();
        for (const etiqueta of etiquetas) {
            const [rows] = await connection.query<RowDataPacket[]>( queries.insertEtiquetas, [idGrupo, etiqueta]);
            if (!rows || rows.length === 0) {
                throw new Error(`Error al insertar la etiqueta: ${etiqueta}`);
            }
            const insertedEtiqueta = rows[0][0] as Etiqueta;
            insertedEtiquetas.push(insertedEtiqueta);
        }
        await connection.commit();
        return insertedEtiquetas;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

export const updateEtiqueta = async (idEtiqueta: string, nombre: string): Promise<Etiqueta | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateEtiqueta, [idEtiqueta, nombre]);
    return  rows[0][0] as Etiqueta || undefined;
}

