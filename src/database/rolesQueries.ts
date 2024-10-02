export const queries = {
    getAllRoles: `SELECT * FROM Roles;`,
    getRolById: `SELECT idRol, clave, nombre, estado FROM Roles WHERE idRol = ?;`,
    deleteRolById: `CALL proc_delete_roles(?);`,
    insertRol: `CALL proc_insert_roles(?, ?, ?);`,
    updateRolById: `CALL proc_update_roles(?, ?, ?);`,
}