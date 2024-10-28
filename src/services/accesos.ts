import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/accesos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Acceso } from '../types';

export const getAcceso = async (idRol: string, idModulo: string): Promise<Acceso | undefined> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>(queries.getAcceso, [idRol, idModulo]);
    return rows[0] as Acceso || undefined;
}

export const getAccesos = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Acceso[] | undefined> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getAccesos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Acceso[]) : undefined;
}

export const deleteAcceso = async (idRol: string, idModulo: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteAcceso, [idRol, idModulo]);
    return result.affectedRows;
}

export const insertAcceso = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string): Promise<Acceso | undefined> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>(queries.insertAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
    return  rows[0] as Acceso || undefined;
}

export const updateAcceso = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string): Promise<Acceso | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
    return  rows[0] as Acceso || undefined;
}
