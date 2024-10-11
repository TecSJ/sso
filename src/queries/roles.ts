export const queries = {
    getRoles: `SELECT * FROM Roles;`,
    getRol: `SELECT idRol, clave, nombre, estado FROM Roles WHERE idRol = ?;`,
    filterRoles: `SELECT * FROM Roles  `,
    deleteRol: `CALL proc_delete_roles(?);`,
    insertRol: `CALL proc_insert_roles(?, ?);`,
    updateRol: `CALL proc_update_roles(?, ?, ?);`,
}
