export const queries = {
    getAccesos: `SELECT * FROM Accesos AS A 
                INNER JOIN Perfiles AS P ON ( A.idRol = P.idRol ) 
                INNER JOIN Credenciales AS C ON (P.idCredencial = C.idCredencial) 
                INNER JOIN Modulos AS M ON ( A.idModulo = M.idModulo )
                WHERE C.idCredencial = ? AND C.estado = 'Validado' AND 
                P.estado = 'Activo' AND M.clave = ? `
}
