export const queries = {
    getGrupos: `SELECT * FROM Grupos `,
    getGrupo: `SELECT * FROM Grupos WHERE idGrupo = ?;`,
    deleteGrupos: `UPDATE Grupos SET estado = "Inactivo" WHERE idGrupo IN (?)`,
    insertGrupo: `CALL proc_insert_grupos(?, ?);`,
    updateGrupo: `CALL proc_update_grupos(?, ?, ?);`,
}
