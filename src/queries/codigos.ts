export const queries = {
    getCodigos: `SELECT * FROM codigos ;`,
    getCodigo: `SELECT idCodigo, idCredencial, clave, tipo, caducidad FROM Codigos WHERE idCodigo = ?;`,
    filterCodigos: `SELECT * FROM Codigos  `,
    deletCodigo: `CALL proc_delete_codigos(?);`,
    insertCodigo: `CALL proc_insert_codigos(?, ?, ?, ? );`,
    updateCodigo: `CALL proc_update_codigos(?, ?, ?, ?, ?);`,
}

