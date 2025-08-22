export const queries = {
    getEtiquetas: `SELECT * FROM seg_Etiquetas `,
    getEtiqueta: `SELECT * FROM seg_Etiquetas WHERE idEtiqueta = ?;`,
    deleteEtiquetas: `UPDATE seg_Etiquetas SET estado = "Inactivo" WHERE idCredencial = ? AND nombre IN (?) `,
    insertEtiquetas: `CALL proc_insert_etiquetas(?, ?);`,
    updateEtiqueta: `CALL proc_update_etiquetas(?, ?);`
}


