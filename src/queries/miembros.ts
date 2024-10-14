export const queries = {
    getMiembros: `SELECT * FROM Miembros `,
    getMiembro: `SELECT * FROM Miembros WHERE idMiembro = ?;`,
    deleteMiembro: `CALL proc_delete_miembros(?);`,
    insertMiembro: `CALL proc_insert_miembros(?, ?);`,
    updateMiembro: `CALL proc_update_miembros(?, ? );`
}


