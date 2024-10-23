import { ssoDB } from '../model/Connection';
import { queries } from '../queries/preferencias';

export const getPreferencia = async (idCredencial: string) => {
    const [result]: any = await ssoDB.query(queries.getPreferencia, [idCredencial]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const updatePreferencia = async (idCredencial: string, dobleFactor: string, cambiarContrasena: string) => {
    await ssoDB.query(queries.updatePreferencia, [idCredencial, dobleFactor, cambiarContrasena]);
    return undefined;
}