export const queries = {
    getPreferencias: `SELECT * FROM Preferencias;`,
    getPreferencia: `SELECT * FROM Preferencias WHERE idPreferencia = ?;`,
    deletePreferencia: `CALL proc_delete_preferencias(?);`,
    insertPreferencia: `CALL proc_insert_preferencias(?, ?, ?);`,
    updatePreferencia: `CALL proc_update_preferencias(?, ?, ?, ?);`
}