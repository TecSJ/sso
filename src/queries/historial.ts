export const queries = {
    getBitacora: `SELECT * FROM Historial  `,
    getHistorial: `SELECT * FROM Historial WHERE idCredencial = ?; `,
    insertHistorial: `CALL proc_insert_historial( ?, ?, ?, ?, ?, ? );`,
}

