import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/accesos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Acceso } from '../types';

export const getAccesos = async ( idRol: string): Promise<any> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>( queries.getAccesos, [idRol]);
    return rows;
}

export const addAccesos = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string, accion6: string, accion7: string, accion8: string): Promise<Acceso| undefined> => {
    const connection = await ssoDB.getConnection();
    try {
        await connection.beginTransaction();
        const [existingRows] = await connection.query<RowDataPacket[]>( 'SELECT * FROM seg_Accesos WHERE idRol = ? and idModulo = ?', [idRol, idModulo]);
        if (existingRows.length > 0) {
            const existingData = existingRows[0];
            if ( existingData.accion1 === accion1 && existingData.accion2 === accion2 &&
                existingData.accion3 === accion3 && existingData.accion4 === accion4 &&
                existingData.accion5 === accion5 && existingData.accion6 === accion6 &&
                existingData.accion7 === accion7 && existingData.accion8 === accion8
            ) {
                await connection.commit();
                return existingData as Acceso;
            }
            await connection.query(queries.updateAcceso, [ idRol, idModulo, accion1, accion2, accion3, accion4, accion5, accion6, accion7, accion8, ]);
        } else {
            await connection.query(queries.insertAcceso, [ idRol, idModulo, accion1, accion2, accion3, accion4, accion5, accion6, accion7, accion8, ]);
        }
        await connection.commit();
        const [rows] = await ssoDB.query<RowDataPacket[]>( 'SELECT * FROM seg_Accesos WHERE idRol = ? and idModulo = ?', [idRol, idModulo]);
        return rows.length > 0 ? (rows[0] as Acceso) : undefined;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
