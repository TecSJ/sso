export const queries = {
    getAccesos: `SELECT * FROM Accesos `,
    getAcceso: `SELECT * FROM Accesos WHERE idRol = ? AND idModulo = ? ;`,
    deleteAcceso: `CALL proc_delete_accesos(?, ?);`,
    insertAcceso: `CALL proc_insert_accesos(?, ?, ?, ?, ?, ?, ? );`,
    updateAcceso: `CALL proc_update_accesos(?, ?, ?, ?, ?, ?, ? );`
}
