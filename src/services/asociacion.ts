import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/asociacion';
import { QueryBuilder } from '../model/QueryBuilder';
import { Asociacion } from '../types';

export const getAsociacion = async (idCredencial: string): Promise<Asociacion[] | undefined> => {
  const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getAsociacion, [idCredencial]);
  return rows.length > 0 ? (rows as Asociacion[]) : undefined;
};

export const getAsociaciones = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getAsociaciones, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Asociacion[]) : undefined;
}

export const deleteAsociacion = async (idEtiqueta: string, idCredencial: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteAsociacion, [idEtiqueta, idCredencial]);
    return result.affectedRows;
}

export const upsertAsociacion = async (
    seleccionado: number,
    idEtiqueta: string,
    idCredencial: string
  ): Promise<Asociacion | undefined> => {
    const connection = await ssoDB.getConnection();
    try {
      if (seleccionado === 0) {
        await connection.query(queries.deleteAsociacion, [idEtiqueta, idCredencial]);
        return undefined;
      }
  
      const [existingRows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM seg_Asociacion WHERE idCredencial = ? AND idEtiqueta = ?',
        [idCredencial, idEtiqueta]
      );
  
      if (existingRows.length === 0) {
        await connection.query(queries.insertAsociacion, [idEtiqueta, idCredencial]);
      }
  
      const [updatedRows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM seg_Asociacion WHERE idCredencial = ? AND idEtiqueta = ?',
        [idCredencial, idEtiqueta]
      );
  
      return updatedRows.length > 0 ? (updatedRows[0] as Asociacion) : undefined;
    } catch (error) {
      console.error("Error en upsertAsociacion:", error);
      throw error;
    } finally {
      connection.release();
    }
  };
  