import { ssoDB } from '../model/Connection';
import { queries } from '../queries/preferencias';
import { Exception } from '../model/Exception';

export const getPreferencia = async ( idCredencial: string) => {
    try {
        const [result]: any = await ssoDB.query(queries.getPreferencia, [idCredencial]);
        if( result.length > 0 ){
            return result[0];
        }else{
            return undefined;
        }
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}

export const updatePreferencia = async ( idCredencial: string, dobleFactor: string, cambiarContrasena: string ) => {
    try {
        await ssoDB.query(queries.updatePreferencia, [ idCredencial, dobleFactor, cambiarContrasena]);
        return undefined;
    } catch (error: any) {
        throw new Exception(error.message, error);
    }
}