export const queries = {
    getPreferencias: `SELECT * FROM Preferencias;`,
    getPreferencia: `SELECT * FROM Preferencias WHERE idPreferencia = ?;`,
    filterPreferencias: `SELECT * FROM Preferencias  `,
    deletePreferencia: `CALL proc_delete_preferencias(?);`,
    insertPreferencia: `CALL proc_insert_preferencias(?, ?, ?);`,
    updatePreferencia: `CALL proc_update_preferencias(?, ?, ?, ?);`
}