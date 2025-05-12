export const queries = {
    getAccesos: `SELECT * FROM sql_accesos_rol WHERE idRol = ? `,
    deleteAcceso: `CALL proc_delete_accesos(?, ?);`,
    insertAcceso: `CALL proc_insert_accesos(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    updateAcceso: `CALL proc_update_accesos(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
}
