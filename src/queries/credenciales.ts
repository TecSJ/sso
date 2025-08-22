export const queries = {
    getCredenciales: `SELECT  c.idCredencial, c.curp, c.nombre, c.primerApellido, c.segundoApellido, c.fechaNacimiento, c.estadoNacimiento,
    c.correo, c.celular, c.tipo,c.estado,
    GROUP_CONCAT(DISTINCT e.nombre SEPARATOR ',') AS etiquetas,
    GROUP_CONCAT(DISTINCT r.nombre SEPARATOR ',') AS roles,
    GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ',') AS grupos
    FROM seg_Credenciales c
    LEFT JOIN seg_Asociacion a ON c.idCredencial = a.idCredencial
    LEFT JOIN seg_Etiquetas e ON a.idEtiqueta = e.idEtiqueta AND e.estado != 'Inactivo'
    LEFT JOIN seg_Perfiles p ON c.idCredencial = p.idCredencial AND p.estado != 'Inactivo'
    LEFT JOIN seg_Roles r ON p.idRol = r.idRol AND r.estado != 'Inactivo'
    LEFT JOIN seg_Miembros m ON c.idCredencial = m.idCredencial AND m.estado != 'Inactivo'
    LEFT JOIN seg_Grupos g ON m.idGrupo = g.idGrupo AND g.estado != 'Inactivo'
    GROUP BY c.idCredencial;`,
    getCredencial: `SELECT * 
                    FROM seg_Credenciales
                    WHERE idCredencial = ?;`,
    insertCredencial: `CALL proc_insert_credenciales( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );`,
    updateCredencial: `CALL proc_update_credenciales( ?, ?, ?, ?, ?, ? );`,
    deleteCredencial: `CALL proc_delete_credenciales(?);`,
}
