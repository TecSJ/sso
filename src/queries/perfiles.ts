export const queries = {
    getPerfiles: `SELECT * FROM Perfiles `,
    getPerfil: `SELECT * FROM Perfiles WHERE idRol = ?;`,
    insertPerfil: `CALL proc_insert_perfiles( ?, ? );`,
    deletePerfil: `CALL proc_delete_perfiles(?,?);`
}
