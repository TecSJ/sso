import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/grupos';
import { QueryBuilder } from '../model/QueryBuilder';
import { Grupo } from '../types';

export const getGrupo = async (idGrupo: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getGrupo, [idGrupo]);
    return rows[0][0] as Grupo || undefined;
}

export const getGrupos = async (filtros?: string, orden?: string, limite?: number, pagina?: number): Promise<Grupo[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getGrupos, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Grupo[]) : undefined;
}

export const deleteGrupos = async (idGrupo: number[]): Promise<number> => {
    const [result]: any = await ssoDB.query(
        'UPDATE Modulos SET estado = "Inactivo" WHERE idModulo IN (?)',
        [idGrupo]);
    return result.affectedRows;
}

export const insertGrupo = async (clave: string, nombre: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertGrupo, [clave, nombre]);
    return  rows[0][0] as Grupo || undefined;
}

export const updateGrupo = async (idGrupo: string, clave: string, nombre: string): Promise<Grupo | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateGrupo, [idGrupo, clave, nombre]);
    return  rows[0] as Grupo || undefined;
}

export const generarCSV = async (): Promise<string> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getGrupos);
        const encabezados = ['Clave', 'Nombre', 'Estado'];
        const filas = rows.map((grupo) => {
            return [ grupo.clave, grupo.nombre, grupo.estado].join(',');
        });
        return [encabezados.join(','), ...filas].join('\n');
    } catch (error) {
        console.error('Error en generarcsv:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};

export const getGrupselec = async (idCredencial: string): Promise<Grupo[] | undefined> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getGrupsel, [idCredencial]);
        return rows.length > 0 ? rows as Grupo[] : undefined;
    } catch (error) {
        throw new Error('Error al obtener el grupo de la base de datos: ');
    }
};