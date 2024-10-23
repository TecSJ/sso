import { ssoDB } from '../model/Connection';
import { queries } from '../queries/aplicaciones';
import { QueryBuilder } from '../model/QueryBuilder';


export const getAplicacion = async (idAplicacion: string) => {
    const [result]: any = await ssoDB.query(queries.getAplicacion, [idAplicacion]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getAplicaciones = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getAplicaciones, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteAplicacion = async (idAplicacion: string) => {
    await ssoDB.query(queries.deleteAplicacion, [idAplicacion]);
    return undefined;
}

export const insertAplicacion = async (clave: string, nombre: string, redireccion: string) => {
    const [result]: any = await ssoDB.query(queries.insertAplicacion, [clave, nombre, redireccion]);
    return result[0][0];
}

export const updateAplicacion = async (idAplicacion: string, clave: string, nombre: string, redireccion: string) => {
    await ssoDB.query(queries.updateAplicacion, [idAplicacion, clave, nombre, redireccion]);
    return undefined;
}

