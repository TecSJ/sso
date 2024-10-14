export const queries = {
    getRoles: `SELECT * FROM Roles `,
    getRol: `SELECT * FROM Roles WHERE idRol = ?; `,
    deleteRol: `CALL proc_delete_roles(?);`,
    insertRol: `CALL proc_insert_roles(?, ?);`,
    updateRol: `CALL proc_update_roles(?, ?, ?);`,
}
