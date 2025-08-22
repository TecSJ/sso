export const queries = {
    getAsociaciones: `SELECT A.*, E.nombre 
    FROM seg_Asociacion AS A 
    INNER JOIN seg_Etiquetas AS E ON (A.idEtiqueta = E.idEtiqueta) `,
    getAsociacion: `SELECT A.*, E.nombre 
    FROM seg_Asociacion AS A
    INNER JOIN seg_Etiquetas AS E ON (A.idEtiqueta = E.idEtiqueta) 
    WHERE idCredencial = ?;`,
    deleteAsociacion: `CALL proc_delete_asociacion(?, ?);`,
    insertAsociacion: `CALL proc_insert_asociacion(?, ?);`,
}

