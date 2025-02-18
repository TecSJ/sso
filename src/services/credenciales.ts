import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { QueryBuilder } from '../model/QueryBuilder';
import axios from 'axios';
import https from 'https';
import crypto from 'crypto';
import { Credencial } from '../types';
import { verificarUsuarioEnWorkspace } from '../model/Google-Workspace';

const agent = new https.Agent({
    rejectUnauthorized: false
});

export const getCredencial = async (idCredencial: string): Promise<Credencial | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getCredencial, [idCredencial]);
    return rows[0] as Credencial || undefined;
}

export const getCredenciales = async ( filtros?: string, orden?: string, limite?: number, pagina?: number ): Promise<Credencial[] | undefined> => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(QueryBuilder.getQuery(queries.getCredenciales, filtros, orden, limite, pagina));
    return rows.length > 0 ? (rows as Credencial[]) : undefined;
}

export const deleteCredencial = async (idCredencial: string[]): Promise<number> => {
    const [result]: any = await ssoDB.query(
        'UPDATE Credenciales SET estado = "Inactivo" WHERE idCredencial IN (?)',
        [idCredencial]);
    return result.affectedRows;
}

export const insertCredencial = async (curp: string, nombre: string, primerApellido: string, segundoApellido: string, fechaNacimiento: string, estadoNacimiento: string, correo: string, celular: string, contrasena: string, tipo: string): Promise<Credencial | undefined > => {
    const idCredencial = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertCredencial, [idCredencial, curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, criptContrasena, tipo]);
    return  rows[0][0] as Credencial  || undefined;
}

export const insertMoodle = async (curp: string, contrasena: string, nombre: string, primerApellido: string, segundoApellido: string, correo: string, grupo: string, etiqueta: string) => {
    const userValidateUrl = process.env.MOODLE_URL +
        '&wsfunction=core_user_get_users_by_field' +
        '&field=username&values[0]=' + curp.toLowerCase() +
        '&moodlewsrestformat=json';

    const userValidate = await axios.get(userValidateUrl, { httpsAgent: agent });
    if (typeof (userValidate.data[0]) === 'undefined') {
        const md5Password = crypto.createHash('md5').update(curp).digest('hex');
        const createUserUrl = process.env.MOODLE_URL +
            '&wsfunction=core_user_create_users' +
            '&users[0][username]=' + curp.toLowerCase() +
            '&users[0][auth]=manual' +
            '&users[0][password]=A' + md5Password + '*' +
            '&users[0][firstname]=' + nombre +
            '&users[0][lastname]=' + primerApellido + ' ' + segundoApellido +
            '&users[0][email]=' + correo +
            '&users[0][maildisplay]=1' +
            '&users[0][country]=MX' +
            '&users[0][institution]=' + grupo +
            '&users[0][department]=' + etiqueta +
            '&users[0][idnumber]=' + curp.toLowerCase() +
            '&users[0][lang]=es_mx' +
            '&users[0][calendartype]=gregorian' +
            '&moodlewsrestformat=json';
        await axios.get(createUserUrl, { httpsAgent: agent });
    }
}

export const uptateCredencial = async (idCredencial: string, curp: string, correo: string, celular: string, contrasena: string, tipo: string): Promise<Credencial | undefined> => {
    const salt = await bcrypt.genSalt(10);
    if (contrasena !== 'N1nguna') {
        contrasena = await bcrypt.hash(contrasena, salt);
    }
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateCredencial, [idCredencial, curp, correo, celular, contrasena, tipo]);
    return  rows[0][0] as Credencial || undefined;
}

export const generarCSV = async (): Promise<string> => {
    try {
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.getCredenciales);
        const encabezados = [
            'CURP', 'Nombre', 'Primer Apellido', 'Segundo Apellido', 
            'Fecha de Nacimiento', 'Estado de Nacimiento', 'Correo', 'Celular', 
            'Tipo', 'Estado', 'Etiquetas', 'Roles', 'Grupos'
        ];
        const handleNull = (value: any): string => {
            return value === null || value === undefined ? '' : value;
        };
        const filas = rows.map((credencial) => {
            return [
                `"${handleNull(credencial.curp)}"`,
                `"${handleNull(credencial.nombre)}"`,
                `"${handleNull(credencial.primerApellido)}"`,
                `"${handleNull(credencial.segundoApellido)}"`,
                `"${handleNull(credencial.fechaNacimiento)}"`,
                `"${handleNull(credencial.estadoNacimiento)}"`,
                `"${handleNull(credencial.correo)}"`,
                `"${handleNull(credencial.celular)}"`,
                `"${handleNull(credencial.tipo)}"`,
                `"${handleNull(credencial.estado)}"`,
                `"${handleNull(credencial.etiquetas)}"`,
                `"${handleNull(credencial.roles)}"`,
                `"${handleNull(credencial.grupos)}"`
            ].join(',');
        });
        return [encabezados.join(','), ...filas].join('\n');
    } catch (error) {
        console.error('Error en generarcsv:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};

export const getWorkspace = async (idCredencial: string): Promise<any> => {
    const [result]: any[] = await ssoDB.query('SELECT correo, tipo FROM Credenciales WHERE idCredencial = ?', [idCredencial]);
    if (result.length === 0) {
      throw new Error('Credencial no encontrada');
    }
    const { correo, tipo } = result[0];
    const isUserWorkspace = await verificarUsuarioEnWorkspace(correo);
    if (isUserWorkspace && tipo === 'JWT') {
      await ssoDB.query('UPDATE Credenciales SET tipo = "OAuth 2.0" WHERE idCredencial = ?', [idCredencial]);
    } else {
        await ssoDB.query('UPDATE Credenciales SET tipo = "JWT" WHERE idCredencial = ?', [idCredencial]);
    }
    return {
      correo,
      isUserWorkspace,
    };
};
