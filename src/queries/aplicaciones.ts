export const queries = {
    getAplicaciones: `SELECT * FROM Aplicaciones WHERE estado = 'Activo' ORDER BY nombre;`,
    getAplicacion: `SELECT * FROM Aplicaciones WHERE idAplicacion = ?;`,
    deleteAplicacion: `CALL proc_delete_aplicaciones(?);`,
    insertAplicacion: `CALL proc_insert_aplicaciones(?, ?, ? );`,
    updateAplicacion: `CALL proc_update_aplicaciones(?, ?, ?, ?);`,
}

