import { ssoDB } from '../model/Connection';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { QueryBuilder } from '../model/QueryBuilder';
import axios from 'axios';
import https from 'https';
import crypto from 'crypto';
import * as codigos from './codigos';

const agent = new https.Agent({
    rejectUnauthorized: false
});

export const getCredencial = async (idCredencial: string) => {
    const [result]: any = await ssoDB.query(queries.getCredencial, [idCredencial]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getCredenciales = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getCredenciales, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    await ssoDB.query(queries.deleteCredencial, [idCredencial]);
    return undefined;
}

export const insertCredencial = async (curp: string, nombre: string, primerApellido: string, segundoApellido: string, fechaNacimiento: string, estadoNacimiento: string, correo: string, celular: string, contrasena: string, tipo: string) => {
    const idCredencial = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    const [result]: any = await ssoDB.query(queries.insertCredencial, [idCredencial, curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, criptContrasena, tipo]);
    codigos.insertCodigo(idCredencial, 'Validación', 'Correo', correo);
    codigos.insertCodigo(idCredencial, 'Validación', 'Celular', correo);
    return result[0][0];
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

export const uptateCredencial = async (idCredencial: string, curp: string, correo: string, celular: string, contrasena: string, tipo: string) => {
    const salt = await bcrypt.genSalt(10);
    if (contrasena !== 'N1nguna') {
        contrasena = await bcrypt.hash(contrasena, salt);
    }
    await ssoDB.query(queries.updateCredencial, [idCredencial, curp, correo, celular, contrasena, tipo]);
    return undefined;
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    const salt = await bcrypt.genSalt(10);
    const criptContrasena = await bcrypt.hash(contrasena, salt);
    await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
    return undefined;
}
