export const queries = {
    getGrupos: `SELECT * FROM Grupos;`,
    getGrupo: `SELECT idGrupo, clave, nombre, estado FROM Grupos WHERE idGrupo = ?;`,
    filterGrupos: `SELECT * FROM Grupos  `,
    deleteGrupo: `CALL proc_delete_grupos(?);`,
    insertGrupo: `CALL proc_insert_grupos(?, ?);`,
    updateGrupo: `CALL proc_update_grupos(?, ?, ?);`,
}
