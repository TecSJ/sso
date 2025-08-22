export const queries = {
    getPerfiles: `SELECT P.*, R.nombre FROM seg_Perfiles AS P INNER JOIN Roles AS R ON (R.idRol = P.idRol) `,
    getPerfil: `SELECT * FROM seg_Perfiles WHERE idCredencial = ?;`,
    insertPerfil: `CALL proc_insert_perfiles( ?, ? );`,
    deletePerfil: `CALL proc_delete_perfiles(?,?);`
}
