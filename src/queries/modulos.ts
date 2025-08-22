export const queries = {
    getModulos: `SELECT m.idModulo, m.idAplicacion, m.clave, m.nombre, a.clave AS aplicacion, m.estado
    FROM seg_Modulos AS m 
    INNER JOIN seg_Aplicaciones AS a ON m.idAplicacion = a.idAplicacion
    WHERE m.estado = 'Activo' AND a.estado = 'Activo' 
    ORDER BY a.clave, m.nombre;`,
    getModulo: `SELECT * FROM seg_Modulos WHERE idModulo = ?;`,
    insertModulo: `CALL proc_insert_modulos(?, ?, ?);`,
    updateModulo: `CALL proc_update_modulos(?, ?, ?, ?);`,
    deleteModulo: `CALL proc_delete_modulos(?);`
}