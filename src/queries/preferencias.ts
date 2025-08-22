export const queries = {
    getPreferencia: `SELECT * FROM seg_Preferencias WHERE idCredencial = ?;`,
    updatePreferencia: `CALL proc_update_preferencias( ?, ?, ?);`
}