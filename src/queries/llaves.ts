export const queries = {
    insertLlave: `INSERT INTO seg_Llaves (idCredencial, curp, ubicacion, fechaCreacion, estado) VALUES(?, ?, ?, NOW(), 1)`,
    validarLlave: `SELECT COUNT(idLlave) AS valse FROM seg_Llaves WHERE curp = ? AND estado = 1`,
}