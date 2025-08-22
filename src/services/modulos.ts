import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/modulos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Modulo } from '../types';

export const getModulo = async (idModulo: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getModulo, [idModulo]);
    return rows[0][0] as Modulo || undefined;
}

export const getModulos = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Modulo[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getModulos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Modulo[]) : undefined;
}

export const deleteModulo = async (idModulo: number[]): Promise<number> => {
    const [result]: any = await ssoDB.query(
        'UPDATE seg_Modulos SET estado = "Inactivo" WHERE idModulo IN (?)',
        [idModulo]);
    return result.affectedRows;
}

export const insertModulo = async (idAplicacion: string, clave: string, nombre: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertModulo, [idAplicacion, clave, nombre]);
    return  rows[0][0] as Modulo || undefined;
}

export const uptateModulo = async (idModulo: string, idAplicacion: string ,clave: string, nombre: string): Promise<Modulo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateModulo, [idModulo, idAplicacion, clave, nombre]);
    return  rows[0][0] as Modulo || undefined;
}

export const generarCSV = async (): Promise<string> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getModulos);
        const encabezados = ['Clave', 'Nombre', 'Redireccion', 'Estado'];
        const filas = rows.map((modulo) => {
            return [ modulo.clave, modulo.nombre, modulo.estado].join(',');
        });
        return [encabezados.join(','), ...filas].join('\n');
    } catch (error) {
        console.error('Error en generarcsv:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};
