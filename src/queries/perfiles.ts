export const queries = {
    getPerfiles: `SELECT *
                    FROM Perfiles;`,
    getPerfil: `SELECT *
                    FROM Perfiles
                    WHERE idPerfil = ?;`,
    filterPerfiles: `SELECT * FROM Perfiles `,
    insertPerfil: `CALL proc_insert_perfiles(?, ?);`,
    updatePerfil: `CALL proc_update_perfiles(?, ?, ?);`,
    deletePerfil: `CALL proc_delete_perfiles(?);`
}
