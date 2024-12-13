export const queries = {
    getGrupos: `SELECT * FROM Grupos `,
    getGrupo: `SELECT * FROM Grupos WHERE idGrupo = ?;`,
    getGrupsel: `SELECT g.idGrupo, g.clave, g.nombre, g.estado,IF(m.idGrupo IS NOT NULL, 1, 0) AS seleccionado FROM Grupos g
                LEFT JOIN Miembros m ON g.idGrupo = m.idGrupo AND m.idCredencial = ?
                WHERE g.estado = "Activo"`,
    deleteGrupos:`CALL proc_delete_grupos(?);`,
    insertGrupo: `CALL proc_insert_grupos(?, ?);`,
    updateGrupo: `CALL proc_update_grupos(?, ?, ?);`,
}
