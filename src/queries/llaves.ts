export const queries = {
    insertLlave: `INSERT INTO Llaves (idCredencial, curp, ubicacion, fechaCreacion, estado) VALUES(?, ?, ?, NOW(), 1)`,
    validarLlave: `SELECT COUNT(idLlave) AS val FROM Llaves WHERE curp = ?`
}