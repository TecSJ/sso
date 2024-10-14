export const queries = {
    getCredenciales: `SELECT idCredencial, curp, correo, celular, tipo, estado
                    FROM Credenciales;`,
    getCredencial: `SELECT idCredencial, curp, correo, celular, tipo, estado
                    FROM Credenciales
                    WHERE idCredencial = ?;`,
    filterCredenciales: `SELECT * FROM Credenciales `,
    insertCredencial: `CALL proc_insert_credenciales( ?, ?, ?, ?, ?, ? );`,
    updateCredencial: `CALL proc_update_credenciales(?, ?, ?, ?, ? );`,
    updateContrasena: `CALL proc_updatePass_credenciales(?, ?);`,
    deleteCredencial: `CALL proc_delete_credenciales(?);`,
    getCodigo: `SELECT clave, caducidad, estado FROM Codigos WHERE idCredencial = ? AND tipo= 'Validación' AND medio = ? ;`,
    insertCodigo: `INSERT INTO Codigos ( idCredencial, clave, tipo, medio ) VALUES( ?, FLOOR(RAND() * 9000) + 1000, 'Validación', ? );`
}
