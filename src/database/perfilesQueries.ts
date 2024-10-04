export const queries = {
    getAllPerfiles: `SELECT *
                    FROM Perfiles;`,
    getPerfilById: `SELECT *
                    FROM Perfiles
                    WHERE idPerfil = ?;`,
    insertPerfil: `CALL proc_insert_perfiles(?, ?);`,
    updatePerfil: `CALL proc_update_perfiles(?, ?, ?);`,
    deletePerfil: `CALL proc_delete_perfiles(?);`
}