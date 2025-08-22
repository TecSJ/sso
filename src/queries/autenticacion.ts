export const queries = {
    getAccesos: `SELECT * FROM seg_Accesos AS A 
                INNER JOIN seg_Perfiles AS P ON ( A.idRol = P.idRol ) 
                INNER JOIN seg_Credenciales AS C ON (P.idCredencial = C.idCredencial) 
                INNER JOIN seg_Modulos AS M ON ( A.idModulo = M.idModulo )
                WHERE C.idCredencial = ? AND C.estado = 'Validado' AND 
                P.estado = 'Activo' AND M.clave = ? `
}
