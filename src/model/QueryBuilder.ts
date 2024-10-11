export class QueryBuilder {
    private static buildWhere(filtros: string | undefined): string {
        let cadena: string[] = [];
        if (filtros) {
            const arreglo = filtros.split(',');
            arreglo.forEach(filtro => {
                const [campo, operador, valor] = filtro.split(':');
                switch (operador) {
                    case 'ct':
                        cadena.push(`${campo} LIKE '%${valor}%'`);
                        break;
                    case 'nct':
                        cadena.push(`${campo} NOT LIKE '%${valor}%'`);
                        break;
                    case 'bw':
                        cadena.push(`${campo} LIKE '${valor}%'`);
                        break;
                    case 'nbw':
                        cadena.push(`${campo} NOT LIKE '${valor}%'`);
                        break;
                    case 'ew':
                        cadena.push(`${campo} LIKE '%${valor}'`);
                        break;
                    case 'nuevo':
                        cadena.push(`${campo} = '${valor}'`);
                        break;
                    case 'eq':
                        cadena.push(`${campo} = '${valor}'`);
                        break;
                    case 'neq':
                        cadena.push(`${campo} != '${valor}'`);
                        break;
                    case 'gt':
                        cadena.push(`${campo} > '${valor}'`);
                        break;
                    case 'gte':
                        cadena.push(`${campo} >= '${valor}'`);
                        break;
                    case 'lt':
                        cadena.push(`${campo} < '${valor}'`);
                        break;
                    case 'lte':
                        cadena.push(`${campo} <= '${valor}'`);
                        break;
                    default:
                        break;
                }
            });
        }
        return cadena.length > 0 ? 'WHERE ' + cadena.join(' AND ') : '';
    }

    private static buildOrder(orden: string | undefined): string {
        let cadena = '';
        if (orden) {
            const camposOrden = orden.split(',');
            cadena = 'ORDER BY ' + camposOrden.map(campo => {
                const [nombreCampo, tipoOrden] = campo.split(':');
                const orden = tipoOrden && tipoOrden.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
                return `${nombreCampo} ${orden}`;
            }).join(',');
        }
        return cadena;
    }

    private static buildPagination(limit: number | undefined, page: number | undefined): string {
        if (!limit) return '';
        const offset = page && page > 1 ? (page - 1) * limit : 0;
        return `LIMIT ${limit} OFFSET ${offset}`;
    }

    public static getQuery = ( query: string, filtros: string | undefined, orden: string | undefined, limit: number | undefined, page: number | undefined ) => {
        const whereClause = QueryBuilder.buildWhere(filtros);
        const orderClause = QueryBuilder.buildOrder(orden);
        const paginationClause = QueryBuilder.buildPagination( limit, page);
        let cad = whereClause;
        if (orderClause) cad += ' ' + orderClause;
        if (paginationClause) cad += ' ' + paginationClause;
        return `${query} ${cad}`;
    }

}
