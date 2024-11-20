import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/accesos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Acceso } from '../types';

export const getAccesos = async ( idRol: string): Promise<any> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>( queries.getAccesos, [idRol]);
    return rows;
}

export const addAccesos = async (idRol: string, idModulo: string, accion1: string, accion2: string, accion3: string, accion4: string, accion5: string): Promise<Acceso | undefined> => {
    const [rows]: any = await ssoDB.query<RowDataPacket[]>(queries.insertAcceso, [idRol, idModulo, accion1, accion2, accion3, accion4, accion5]);
    return  rows[0][0] as Acceso;
}

