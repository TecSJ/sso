export const queries = {
    getParametros: `SELECT * FROM Parametros `,
    getParametro: `SELECT * FROM Parametros WHERE idParametro = ?;`,
    updateParametro: `CALL proc_update_parametros(?, ?);`,
}

