export const queries = {
    getEtiquetas: `SELECT * FROM Etiquetas WHERE idGrupo = ?;`,
    getEtiqueta: `SELECT idEtiqueta, idGrupo, nombre FROM Etiquetas WHERE idGrupo = ? AND idEtiqueta = ?;`,
    deleteEtiqueta: `DELETE FROM Etiquetas WHERE idGrupo = ? AND idEtiqueta = ?`,
    insertEtiqueta: `INSERT INTO Etiquetas (idGrupo, nombre) VALUES(?,?)`,
    updateEtiqueta: `UPDATE Etiquetas SET nombre = ? WHERE idGrupo = ? AND idEtiqueta = ?`,
}

