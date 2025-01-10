import { QueryBuilder } from "../model/QueryBuilder"

export const queries = {
    getModulos: `SELECT * FROM Modulos WHERE estado = 'Activo'`,
    getModulo: `SELECT * FROM Modulos WHERE idModulo = ?;`,
    insertModulo: `CALL proc_insert_modulos(?, ?, ?);`,
    updateModulo: `CALL proc_update_modulos(?, ?, ?, ?);`,
    deleteModulo: `CALL proc_delete_modulos(?);`
}