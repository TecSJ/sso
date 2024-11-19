export const queries = {
    getEtiquetas: `SELECT * FROM Etiquetas `,
    getEtiqueta: `SELECT * FROM Etiquetas WHERE idEtiqueta = ?;`,
    deleteEtiqueta: `CALL proc_delete_etiquetas(?);`,
    insertEtiquetas: `CALL proc_insert_etiquetas(?, ?);`,
    updateEtiqueta: `CALL proc_update_etiquetas(?, ?);`
}


