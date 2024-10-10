export const queries = {
    getEtiquetas: `SELECT * FROM Etiquetas WHERE idGrupo = ?;`,
    getEtiqueta: `SELECT idEtiqueta, idGrupo, nombre FROM Etiquetas WHERE idGrupo = ? AND idEtiqueta = ?;`,
    deleteEtiqueta: `DELETE FROM Etiquetas WHERE idGrupo = ? AND idEtiqueta = ?`,
    insertEtiqueta: `CALL proc_insert_etiquetas(?, ?);`,
    updateEtiqueta: `CALL proc_update_etiquetas(?, ?, ?);`
}


