export const queries = {
    getCodigos: `SELECT * FROM Codigos `,
    getCodigo: `SELECT * FROM Codigos WHERE idCodigo = ?;`,
    deletCodigo: `CALL proc_delete_codigos(?);`,
    insertCodigo: `CALL proc_insert_codigos(?, ?, ? );`,
    updateCodigo: `CALL proc_update_codigos(?, ? );`,
    validarCodigo: `SELECT * FROM Codigos WHERE idCredencial = ? AND clave = ? and medio = ? and tipo = ?  `,
    confirmarCodigo: `UPDATE Codigos SET estado = 'Confirmado' WHERE idCodigo = ? `
}

