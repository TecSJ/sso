export const queries = {
    iniciarSesion: `SELECT * FROM Credenciales WHERE curp = ? OR correo = ? OR celular = ?  `,
    deleteSesion: `DELETE FROM Codigos WHERE idCredencial = ? AND tipo = 'Autenticación' `,
}
