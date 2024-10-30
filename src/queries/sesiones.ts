export const queries = {
    getCredencial: `SELECT * FROM Credenciales WHERE curp = ? OR correo = ? OR celular like ? `,
    deleteSesion: `DELETE FROM Codigos WHERE idCredencial = ? AND tipo = 'Autenticación' `,
    updateContrasena: `CALL proc_updatePass_credenciales(?, ?);`,
}
