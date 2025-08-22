import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/roles';
import { QueryBuilder } from '../model/QueryBuilder';
import { Rol } from '../types';

export const getRol = async (idRol: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getRol, [idRol]);
    return rows[0][0] as Rol || undefined;
}

export const getRoles = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Rol[] | undefined>=> {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getRoles, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Rol[]) : undefined;
}

export const deleteRol = async (idRol: number[]) => {
    const [result]: any = await ssoDB.query(
        'UPDATE seg_Roles SET estado = "Inactivo" WHERE idRol IN (?)',
        [idRol]);
    return result.affectedRows;
}

export const insertRol = async (clave: string, nombre: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertRol, [clave, nombre]);
    return rows[0][0] as Rol || undefined;
}

export const updateRol = async (idRol: string, clave: string, nombre: string): Promise<Rol | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateRol, [idRol, clave, nombre]);
    return rows[0][0] as Rol || undefined;
}


export const generarCSV = async (): Promise<string> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getRoles);
        const encabezados = ['Clave', 'Nombre', 'Estado'];
        const filas = rows.map((roles) => {
            return [ roles.clave, roles.nombre, roles.estado].join(',');
        });
        return [encabezados.join(','), ...filas].join('\n');
    } catch (error) {
        console.error('Error en generarcsv:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};

export const getRolselec = async (idCredencial: string): Promise<Rol[] | undefined> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getRolsel, [idCredencial]);
        return rows.length > 0 ? rows as Rol[] : undefined;
    } catch (error) {
        throw new Error('Error al obtener el rol de la base de datos: ');
    }
};