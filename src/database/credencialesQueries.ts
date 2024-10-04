export const queries = {
    getAllCredenciales: `SELECT idCredencial, curp, usuario, correo, celular, tipo, estado
                    FROM Credenciales;`,
    getCredencialById: `SELECT idCredencial, curp, usuario, correo, celular, tipo, estado
                    FROM Credenciales
                    WHERE idCredencial = ?;`,
    insertCredencial: `CALL proc_insert_credenciales(?, ?, ?, ?, ?, ?);`,
    updateCredencial: `CALL proc_update_credenciales(?, ?, ?, ?, ?);`,
    updateContrasena: `CALL proc_updatePass_credenciales(?, ?);`,
    deleteCredencial: `CALL proc_delete_credenciales(?);`
}