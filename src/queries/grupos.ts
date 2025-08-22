export const queries = {
    getGrupos: `SELECT * FROM seg_Grupos WHERE estado = 'Activo' `,
    getGrupo: `SELECT * FROM seg_Grupos WHERE idGrupo = ?;`,
    getGrupsel: `SELECT g.idGrupo, g.clave, g.nombre, g.estado,IF(m.idGrupo IS NOT NULL, 1, 0) AS seleccionado FROM seg_Grupos g
                LEFT JOIN seg_Miembros m ON g.idGrupo = m.idGrupo AND m.idCredencial = ?
                WHERE g.estado = "Activo"`,
    deleteGrupos:`CALL proc_delete_grupos(?);`,
    insertGrupo: `CALL proc_insert_grupos(?, ?);`,
    updateGrupo: `CALL proc_update_grupos(?, ?, ?);`,
}
