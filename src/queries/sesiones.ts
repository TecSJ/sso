export const queries = {
    iniciarSesion: `SELECT * FROM Credenciales WHERE curp = ? OR correo = ? OR celular = ?  `,
}
