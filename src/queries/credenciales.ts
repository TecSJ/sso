export const queries = {
    getCredenciales: `SELECT * FROM Credenciales `,
    getCredencial: `SELECT * 
                    FROM Credenciales
                    WHERE idCredencial = ?;`,
    insertCredencial: `CALL proc_insert_credenciales( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );`,
    updateCredencial: `CALL proc_update_credenciales( ?, ?, ?, ?, ?, ? );`,
    deleteCredencial: `CALL proc_delete_credenciales(?);`,
}
