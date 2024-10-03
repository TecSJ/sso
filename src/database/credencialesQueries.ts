export const queries = {
    getAllCredenciales: `SELECT *
                    FROM Credenciales;`,
    getCredencialById: `SELECT *
                    FROM Credenciales
                    WHERE idCredencial = ?;`,
    insertCredencial: `CALL proc_insert_credenciales(?, ?);`,
    updateCredencial: `CALL proc_update_credenciales(?, ?, ?);`,
    deleteCredencial: `CALL proc_delete_credenciales(?);`
}