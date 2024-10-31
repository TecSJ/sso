import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/preferencias';
import { Preferencia } from '../types';

export const getPreferencia = async (idCredencial: string): Promise<Preferencia | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getPreferencia, [idCredencial]);
    return rows[0][0] as Preferencia || undefined;
}

export const updatePreferencia = async (idCredencial: string, dobleFactor: string, cambiarContrasena: string): Promise<Preferencia | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updatePreferencia, [idCredencial, dobleFactor, cambiarContrasena]);
    return rows[0][0] as Preferencia || undefined;
}