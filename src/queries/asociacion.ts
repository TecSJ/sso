export const queries = {
    getAsociaciones: `SELECT A.*, E.nombre FROM Asociacion AS A INNER JOIN Etiquetas AS E ON (A.idEtiqueta = E.idEtiqueta) `,
    getAsociacion: `SELECT * FROM Asociacion WHERE idCredencial = ?;`,
    deleteAsociacion: `CALL proc_delete_asociacion(?, ?);`,
    insertAsociacion: `CALL proc_insert_asociacion(?, ?);`,
}

