import { ssoDB } from '../model/Connection';
import { queries } from '../queries/etiquetas';
import { QueryBuilder } from '../model/QueryBuilder';

export const getEtiqueta = async (idEtiqueta: string) => {
    const [result]: any = await ssoDB.query(queries.getEtiqueta, [idEtiqueta]);
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

export const getEtiquetas = async (filtros: string | undefined, orden: string | undefined, limite: number | undefined, pagina: number | undefined) => {
    const [result]: any = await ssoDB.query(QueryBuilder.getQuery(queries.getEtiquetas, filtros, orden, limite, pagina));
    if (result.length > 0) {
        return result;
    } else {
        return undefined;
    }
}

export const deleteEtiqueta = async (idEtiqueta: string) => {
    await ssoDB.query(queries.deleteEtiqueta, [idEtiqueta]);
    return undefined;
}

export const insertEtiqueta = async (idGrupo: string, nombre: string) => {
    const [result]: any = await ssoDB.query(queries.insertEtiqueta, [idGrupo, nombre]);
    return result[0][0];
}

export const updateEtiqueta = async (idEtiqueta: string, nombre: string) => {
    await ssoDB.query(queries.updateEtiqueta, [idEtiqueta, nombre]);
    return undefined;
}

