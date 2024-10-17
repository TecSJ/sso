import { ssoDB } from '../model/Connection';
import { queries } from '../queries/credenciales';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Exception } from '../model/Exception';
import { QueryBuilder } from '../model/QueryBuilder';
import axios from 'axios';
import https from 'https';
import crypto from 'crypto';

const agent = new https.Agent({  
    rejectUnauthorized: false
});

export const getCredencial = async (idCredencial: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getCredencial, [idCredencial]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error : any) {
        throw new Exception(error.message, error);
    }
}

export const getCredenciales = async ( filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined ) => {
    try {
        const [result]: any = await ssoDB.query( QueryBuilder.getQuery( queries.getCredenciales, filtros, orden, limite, pagina ) );
        if( result.length > 0 ){
            return result;
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    try {
        await ssoDB.query(queries.deleteCredencial, [idCredencial]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const insertCredencial = async (curp: string, correo: string, celular: string, contrasena: string, tipo: string ) => {
    try {
        const idCredencial = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [result]: any = await ssoDB.query(queries.insertCredencial, [ idCredencial, curp, correo, celular, criptContrasena, tipo ]);
        return result[0][0];
    } catch (error: any ) {
        throw new Exception(error.message, error);
    }
}

export const CreateMoodle = async (curp: string, password: string, name:string, firstName: string, secondName: string, email:string, extension:string, program:string) => {
    try{
        const userValidateUrl = process.env.moodle_url+
        '&wsfunction=core_user_get_users_by_field'+
        '&field=username&values[0]='+curp.toLowerCase()+
        '&moodlewsrestformat=json';

        const userValidate = await axios.get(userValidateUrl, { httpsAgent: agent });

        if(typeof(userValidate.data[0]) === 'undefined'){

            const md5Password = crypto.createHash('md5').update(curp).digest('hex');

            //console.log(md5Password);

            const createUserUrl = process.env.moodle_url+
            '&wsfunction=core_user_create_users'+
            '&users[0][username]='+curp.toLowerCase()+
            '&users[0][auth]=manual'+
            '&users[0][password]=A'+md5Password+'*'+
            '&users[0][firstname]='+name+
            '&users[0][lastname]='+firstName+' '+secondName+
            '&users[0][email]='+email+
            '&users[0][maildisplay]=1'+
            '&users[0][country]=MX'+
            '&users[0][institution]='+extension+
            '&users[0][department]='+program+
            '&users[0][idnumber]='+curp.toLowerCase()+
            '&users[0][lang]=es_mx'+
            '&users[0][calendartype]=gregorian'+
            '&moodlewsrestformat=json';
            
            //console.log(createUserUrl);

            /*const createUser = */await axios.get(createUserUrl, { httpsAgent: agent });
            //console.log(createUser);

        }

    }catch(error: any){
        throw new Exception(error.message, error);
    }
}

export const uptateCredencial = async ( idCredencial: string, curp: string, correo: string, celular: string, contrasena: string, tipo: string ) => {
    try {
        const salt = await bcrypt.genSalt(10);
        if( contrasena !== 'N1nguna' ){
            contrasena = await bcrypt.hash(contrasena, salt);
        }
        await ssoDB.query( queries.updateCredencial, [ idCredencial, curp, correo, celular, contrasena, tipo ]);
        return undefined;
    } catch (error: any ) {
        throw new Exception( error.message, error);
    }
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}
