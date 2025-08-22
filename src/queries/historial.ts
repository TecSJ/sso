export const queries = {
    getBitacora: `SELECT * FROM SEG_Historial  `,
    getHistorial: `SELECT * FROM SEG_Historial WHERE idCredencial = ?; `,
    insertHistorial: `CALL proc_insert_historial( ?, ?, ?, ?, ?, ? );`,
}

