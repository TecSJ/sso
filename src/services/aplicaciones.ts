import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/aplicaciones';
import { QueryBuilder } from '../model/QueryBuilder';
import { Aplicacion } from '../types/'

export const getAplicacion = async (idAplicacion: string): Promise<Aplicacion | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getAplicacion, [idAplicacion]);
    return rows[0] as Aplicacion || undefined;
};

export const getAplicaciones = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Aplicacion[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery( queries.getAplicaciones, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Aplicacion[]) : undefined;
};

export const deleteAplicaciones = async ( idAplicaciones: number[]): Promise<number> => {
    const [result]: any = await ssoDB.query(
        'UPDATE seg_Aplicaciones SET estado = "Inactivo" WHERE idAplicacion IN (?)',
        [idAplicaciones]
    );
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

export const generarCSV = async (): Promise<string> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getAplicaciones);
        const encabezados = ['Clave', 'Nombre', 'Redireccion', 'Estado'];
        const filas = rows.map((aplicacion) => {
            return [ aplicacion.clave, aplicacion.nombre, aplicacion.redireccion, aplicacion.estado].join(',');
        });
        return [encabezados.join(','), ...filas].join('\n');
    } catch (error) {
        console.error('Error en generarcsv:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};