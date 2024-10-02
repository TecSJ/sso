export const queries = {
    getAllGrupos: `SELECT * FROM Grupos;`,
    getGrupoById: `SELECT idGrupo, clave, nombre, estado FROM Grupos WHERE idGrupo = ?;`,
    deleteGrupoById: `CALL proc_delete_grupos(?);`,
    insertGrupo: `CALL proc_insert_grupos(?, ?, ?);`,
    updateGrupoById: `CALL proc_update_grupos(?, ?, ?);`,
}