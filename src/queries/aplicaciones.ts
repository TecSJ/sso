export const queries = {
    getAplicaciones: `SELECT * FROM Aplicaciones;`,
    getAplicacion: `SELECT idAplicacion, clave, nombre, estado FROM Aplicaciones WHERE idAplicacion = ?;`,
    deleteAplicacion: `CALL proc_delete_aplicaciones(?);`,
    insertAplicacion: `CALL proc_insert_aplicaciones(?, ?, ? );`,
    updateAplicacionById: `CALL proc_update_aplicaciones(?, ?, ?, ?);`,
}

