import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/aplicaciones';
import { QueryBuilder } from '../model/QueryBuilder';
import { Aplicacion } from '../types/'

export const getAplicacion = async (idAplicacion: string): Promise<Aplicacion | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getAplicacion, [idAplicacion]);
    return rows[0][0] as Aplicacion || undefined;
};

export const getAplicaciones = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Aplicacion[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery( queries.getAplicaciones, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Aplicacion[]) : undefined;
};

export const deleteAplicacion = async (idAplicacion: string): Promise<number> => {
    const [result]: any = await ssoDB.query(queries.deleteAplicacion, [idAplicacion]);
    return result.affectedRows;
};

export const insertAplicacion = async ( clave: string, nombre: string, redireccion: string): Promise<Aplicacion | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertAplicacion, [clave, nombre, redireccion]);
    return  rows[0][0] as Aplicacion || undefined;
}

export const updateAplicacion = async (idAplicacion: string, clave: string, nombre: string, redireccion: string): Promise<Aplicacion | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateAplicacion, [idAplicacion, clave, nombre, redireccion]);
    return  rows[0][0] as Aplicacion || undefined;
}

