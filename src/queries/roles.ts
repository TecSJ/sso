export const queries = {
    getRoles: `SELECT * FROM seg_Roles WHERE estado = "Activo"; `,
    getRol: `SELECT * FROM seg_Roles WHERE idRol = ?; `,
    getRolsel: `SELECT r.idRol, r.clave, r.nombre, r.estado,IF(p.idRol IS NOT NULL, 1, 0) AS seleccionado FROM seg_Roles r
                LEFT JOIN seg_Perfiles p ON r.idRol = p.idRol AND p.idCredencial = ?
                WHERE r.estado = "Activo"`,
    deleteRol: `CALL proc_delete_roles(?);`,
    insertRol: `CALL proc_insert_roles(?, ?);`,
    updateRol: `CALL proc_update_roles(?, ?, ?);`,
}
