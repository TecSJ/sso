export const queries = {
    getGrupos: `SELECT * FROM Grupos `,
    getGrupo: `SELECT * FROM Grupos WHERE idGrupo = ?;`,
    deleteGrupo: `CALL proc_delete_grupos(?);`,
    insertGrupo: `CALL proc_insert_grupos(?, ?);`,
    updateGrupo: `CALL proc_update_grupos(?, ?, ?);`,
}
