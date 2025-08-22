export const queries = {
    getCodigos: `SELECT * FROM seg_Codigos `,
    getCodigo: `SELECT * FROM seg_Codigos WHERE idCodigo = ?;`,
    deletCodigo: `CALL proc_delete_codigos(?);`,
    insertCodigo: `CALL proc_insert_codigos(?, ?, ? );`,
    updateCodigo: `CALL proc_update_codigos(?, ? );`,
    validarCodigo: `SELECT * FROM seg_Codigos WHERE idCredencial = ? AND clave = ? and medio = ? and tipo = ?  `,
    confirmarCodigo: `UPDATE seg_Codigos SET estado = 'Confirmado' WHERE idCodigo = ? `
}

