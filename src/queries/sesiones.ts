export const queries = {
    getCredencial: `SELECT c.idCredencial, c.curp, c.correo,c.celular, c.contrasena, c.estado,
    GROUP_CONCAT(DISTINCT g.idGrupo SEPARATOR ',') AS grupos,
    GROUP_CONCAT(DISTINCT a.idAplicacion SEPARATOR ',') AS aplicaciones
    FROM Credenciales c
    LEFT JOIN Miembros m ON c.idCredencial = m.idCredencial AND m.estado != 'Inactivo'
    LEFT JOIN Grupos g ON m.idGrupo = g.idGrupo AND g.estado != 'Inactivo'
    LEFT JOIN Perfiles p ON c.idCredencial = p.idCredencial
    LEFT JOIN Roles r ON p.idRol = r.idRol
    LEFT JOIN Accesos ac ON r.idRol = ac.idRol
    LEFT JOIN Modulos mo ON ac.idModulo = mo.idModulo
    LEFT JOIN Aplicaciones a ON mo.idAplicacion = a.idAplicacion
    WHERE c.curp = ? OR c.correo = ? OR c.celular LIKE ?
    GROUP BY c.idCredencial;`,
    deleteSesion: `DELETE FROM Codigos WHERE idCredencial = ? AND tipo = 'Autenticación' `,
    updateContrasena: `CALL proc_updatePass_credenciales(?, ?);`,
}