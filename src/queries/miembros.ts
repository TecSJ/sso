export const queries = {
    getMiembros: `SELECT * FROM seg_Miembros `,
    getMiembro: `SELECT * FROM seg_Miembros WHERE idMiembro = ?;`,
    deleteMiembro: `CALL proc_delete_miembros(?, ?);`,
    insertMiembro: `CALL proc_insert_miembros(?, ?);`,
}


