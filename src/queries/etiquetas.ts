export const queries = {
    getEtiquetas: `SELECT * FROM Etiquetas `,
    getEtiqueta: `SELECT * FROM Etiquetas WHERE idEtiqueta = ?;`,
    deleteEtiquetas: `UPDATE Etiquetas SET estado = "Inactivo" WHERE idGrupo = ? AND nombre IN (?) `,
    insertEtiquetas: `CALL proc_insert_etiquetas(?, ?);`,
    updateEtiqueta: `CALL proc_update_etiquetas(?, ?);`
}


