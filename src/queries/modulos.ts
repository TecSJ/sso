import { QueryBuilder } from "../model/QueryBuilder"

export const queries = {
    getModulos: `SELECT idModulo, idAplicacion, clave, nombre, estado
                    FROM Modulos;`,
    getModulo: `SELECT idAplicacion, clave, nombre, estado
                    FROM Modulos
                    WHERE idModulo = ?;`,
    filterModulos: `SELECT * FROM Modulos `,
    insertModulo: `CALL proc_insert_modulos(?, ?, ?);`,
    updateModulo: `CALL proc_update_modulos(?, ?, ?, ?);`,
    deleteModulo: `CALL proc_delete_modulos(?);`
}