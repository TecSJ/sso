export const queries = {
    getParametros: `SELECT * FROM seg_Parametros `,
    getParametro: `SELECT * FROM seg_Parametros WHERE idParametro = ?;`,
    updateParametro: `CALL proc_update_parametros(?, ?);`,
}

