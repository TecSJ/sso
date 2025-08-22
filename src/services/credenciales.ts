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
import { validarUsuario, estadoSuspension, obtenerDominios,
        dominioRegistrado, crearUsuario
} from '../model/Google-Workspace';

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
    const [curp]: any = await ssoDB.query('SELECT curp FROM seg_Credenciales WHERE idCredencial IN (?)', [idCredencial]);

    const [result]: any = await ssoDB.query(
        'UPDATE seg_Credenciales SET estado = "Inactivo" WHERE idCredencial IN (?)',
        [idCredencial]);
    if (process.env.NODE_ENV === 'production') {
        statusWorkspace(idCredencial[0]);

        const userValidateUrl = process.env.MOODLE_URL +
        '&wsfunction=core_user_get_users_by_field'+
        '&field=idnumber'+
        '&values[0]='+curp[0].curp.toLowerCase()+
        '&moodlewsrestformat=json';

        const userValidate = await axios.get(userValidateUrl, { httpsAgent: agent });

    
        if (typeof (userValidate.data[0]) !== 'undefined') {
            const idMoodle = userValidate.data[0].id;
        
            const userSuspendUrl = process.env.MOODLE_URL +
            '&wsfunction=core_user_update_users'+
            '&users[0][id]='+idMoodle+
            '&users[0][suspended]=1'+
            '&moodlewsrestformat=json';
        
            await axios.get(userSuspendUrl, { httpsAgent: agent });
        }
    }
    return result.affectedRows;
}

export const insertCredencial = async (curp: string, nombre: string, primerApellido: string, segundoApellido: string, fechaNacimiento: string, estadoNacimiento: string, correo: string, celular: string, contrasena: string, tipo: string, perfil?: string ): Promise<Credencial | undefined > => {
    const idCredencial = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.insertCredencial, [idCredencial, curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, criptContrasena, tipo]);
    if (perfil) {
        await ssoDB.query('UPDATE seg_Perfiles SET idRol = (?) WHERE idCredencial IN (?);', [perfil, idCredencial]);
    }
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
    try {
        const salt = await bcrypt.genSalt(10);
        if (contrasena !== 'N1nguna') {
            contrasena = await bcrypt.hash(contrasena, salt);
        }
        const [result]: any[] = await ssoDB.query('SELECT nombre, primerApellido, segundoApellido, tipo FROM seg_Credenciales WHERE idCredencial = ?', [idCredencial]);
        if (tipo === 'OAuth 2.0' && result[0].tipo !== 'OAuth 2.0') {
            const dominioCorreo = correo.split('@')[1];
            if (!await dominioRegistrado(dominioCorreo)) {
                throw new Error('Dominio no registrado en Google Workspace');
            }
            const validado = await validarUsuario(correo);
            if (!validado) {
                const nombre = result[0].nombre
                .toLowerCase()
                .split(' ')
                .map((palabra: string): string => palabra.charAt(0).toUpperCase() + palabra.slice(1))
                .join(' ');
            let apellidos = result[0].primerApellido + ' ' + result[0].segundoApellido;
                apellidos = apellidos
                .toLowerCase()
                .split(' ')
                .map((palabra: string): string => palabra.charAt(0).toUpperCase() + palabra.slice(1))
                .join(' ');
                await crearUsuario(correo, nombre, apellidos);
            }
        }
        const [rows] = await ssoDB.query<RowDataPacket[]>(queries.updateCredencial, [idCredencial, curp, correo, celular, contrasena, tipo]);
        if (!rows || rows.length === 0) {
            throw new Error('No se pudo actualizar la credencial');
        }
        return rows[0][0] as Credencial || undefined;
    } catch (error: any) {
        console.error('Error al actualizar la credencial:', error.message);
        throw new Error(`Error: ${error.message || 'Error al actualizar la credencial'}`);
    }
};


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

export const getDominios = async (): Promise<string[]> => {
    try {
      const result = await obtenerDominios();
      if (!result || result.length === 0) {
        throw new Error('No se encontraron dominios en Google Workspace');
      }
      const domainNames = result.map((domain: any) => domain.domainName);
      return domainNames;
    } catch (error) {
      console.error('Error en getDominios:', error);
      throw new Error('No se encontraron dominios en Google Workspace');
    }
};

export const statusWorkspace = async (idCredencial: string): Promise<any> => {
    const [result]: any[] = await ssoDB.query('SELECT correo, tipo, estado FROM seg_Credenciales WHERE idCredencial = ?', [idCredencial]);
    if (result.length === 0) {
      throw new Error('Credencial no encontrada');
    }
    const { correo, tipo, estado } = result[0];
    if (tipo !== 'OAuth 2.0') {
      throw new Error('Credencial no es de tipo OAuth 2.0');
    }
    try {
      let suspender: boolean;
      if (estado !== 'Inactivo') {
        suspender = false; 
      }
      else {
        suspender = true;
      }
      const googleResponse = await estadoSuspension(correo, suspender);
      return googleResponse;
    } catch (error) {
      throw new Error('No se pudo actualizar el estado en Google Workspace');
    }
  };
  
  