export const queries = {
    getAplicaciones: `SELECT * FROM Aplicaciones `,
    getAplicacion: `SELECT * FROM Aplicaciones WHERE idAplicacion = ?;`,
    deleteAplicacion: `CALL proc_delete_aplicaciones(?);`,
    insertAplicacion: `CALL proc_insert_aplicaciones(?, ?, ? );`,
    updateAplicacion: `CALL proc_update_aplicaciones(?, ?, ?, ?);`,
}

