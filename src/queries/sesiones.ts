export const queries = {
    getCredencial: `SELECT c.idCredencial, c.curp, c.correo, c.celular, c.contrasena, c.estado,
    CONCAT(
        UPPER(SUBSTRING(SUBSTRING_INDEX(c.nombre, ' ', 1), 1, 1)), 
        LOWER(SUBSTRING(SUBSTRING_INDEX(c.nombre, ' ', 1), 2)),
        ' ',
        UPPER(SUBSTRING(c.primerApellido, 1, 1)), LOWER(SUBSTRING(c.primerApellido, 2))
    ) AS nombre,
    GROUP_CONCAT(DISTINCT g.idGrupo SEPARATOR ',') AS grupos,
    GROUP_CONCAT(DISTINCT a.idAplicacion SEPARATOR ',') AS aplicaciones
    FROM seg_Credenciales c
    LEFT JOIN seg_Miembros m ON c.idCredencial = m.idCredencial AND m.estado != 'Inactivo'
    LEFT JOIN seg_Grupos g ON m.idGrupo = g.idGrupo AND g.estado != 'Inactivo'
    LEFT JOIN seg_Perfiles p ON c.idCredencial = p.idCredencial
    LEFT JOIN seg_Roles r ON p.idRol = r.idRol
    LEFT JOIN seg_Accesos ac ON r.idRol = ac.idRol
    LEFT JOIN seg_Modulos mo ON ac.idModulo = mo.idModulo
    LEFT JOIN seg_Aplicaciones a ON mo.idAplicacion = a.idAplicacion
    WHERE c.curp = ? OR c.correo = ? OR c.celular LIKE ?
    GROUP BY c.idCredencial;`,
    deleteSesion: `DELETE FROM seg_Codigos WHERE idCredencial = ? AND tipo = 'Autenticación' `,
    updateContrasena: `CALL proc_updatePass_credenciales(?, ?);`,
}