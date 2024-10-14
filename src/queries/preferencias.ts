export const queries = {
    getPreferencia: `SELECT * FROM Preferencias WHERE idCredencial = ?;`,
    updatePreferencia: `CALL proc_update_preferencias( ?, ?, ?);`
}