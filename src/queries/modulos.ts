import { QueryBuilder } from "../model/QueryBuilder"
//ordenados por la clave de la aplicacion
export const queries = {
    getModulos: `SELECT m.idModulo, m.idAplicacion, m.clave, m.nombre, a.clave AS aplicacion, m.estado
    FROM Modulos AS m 
    INNER JOIN Aplicaciones AS a ON m.idAplicacion = a.idAplicacion
    WHERE m.estado = 'Activo' AND a.estado = 'Activo' 
    ORDER BY a.clave, m.nombre;`,
    getModulo: `SELECT * FROM Modulos WHERE idModulo = ?;`,
    insertModulo: `CALL proc_insert_modulos(?, ?, ?);`,
    updateModulo: `CALL proc_update_modulos(?, ?, ?, ?);`,
    deleteModulo: `CALL proc_delete_modulos(?);`
}