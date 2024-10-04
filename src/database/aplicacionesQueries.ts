export const queries = {
    getAllAplicaciones: `SELECT * FROM Aplicaciones;`,
    getAplicacionById: `SELECT idAplicacion, clave, nombre, estado FROM Aplicaciones WHERE idAplicacion = ?;`,
    deleteAplicacionById: `CALL proc_delete_aplicaciones(?);`,
    insertAplicacion: `CALL proc_insert_aplicaciones(?, ?, ?, ?);`,
    updateAplicacionById: `CALL proc_update_aplicaciones(?, ?, ?, ?);`,
}

