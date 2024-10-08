import { ssoDB } from '../database/connection';
import { queries } from '../database/aplicacionesQueries';
import { Exception } from '../util/Exception';

export const getAplicaciones = async () => {

    let db: any;
    try {
        db = await ssoDB();
        const [ result ] = await db.execute( queries.getAllAplicaciones );
        return result;
    } catch (error : any ) {
        throw new Exception('500','Error desconocido!', error );
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const getAplicacion = async ( idAplicacion: number ) => {

    let db: any;
    try {
        db = await ssoDB();
        const [ result ] = await db.execute( queries.getAplicacionById, [idAplicacion] );
        return result;
    } catch (error : any ) {
        throw new Exception('500','Error desconocido!', error );
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const deleteAplicacion = async (idAplicacion: number) => {

    let db: any;
    try {
        db = await ssoDB();
        const [ result ] = await db.execute( queries.deleteAplicacionById, [ idAplicacion ]);
        return result;
    } catch (error : any ) {
        if ( error.message.includes('ERROR[003]')) { throw new Exception( '401', error.message, error ); }
        throw new Exception('500','Error desconocido!', error );
    } finally {
        if (db) {
            await db.close();
        }
    }
}


export const insertAplicacion = async ( clave: string, nombre: string, redireccion: string ) => {
    let db: any;
    try {
        db = await ssoDB();
        const [ result ] = await db.execute( queries.insertAplicacion , [ clave, nombre, redireccion ]);
        return result;
    } catch (error : any ) {
        if ( error.message.includes('ERROR[001]')) { throw new Exception( '400', error.message, error ); }
        if ( error.message.includes('ERROR[002]')) { throw new Exception( '401', error.message, error ); }
        throw new Exception('500','Error desconocido!', error );
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const updateAplicacion = async ( idAplicacion: number, clave: string, nombre: string, redireccion: string ) => {
    let db: any;
    try {
        db = await ssoDB();
        const [ result ] = await db.execute( queries.updateAplicacionById, [ idAplicacion, clave, nombre, redireccion ]);
        return result;
    } catch (error : any ) {
        if ( error.message.includes('ERROR[001]')) { throw new Exception( '400', error.message, error ); }
        if ( error.message.includes('ERROR[002]')) { throw new Exception( '401', error.message, error ); }
        throw new Exception('500','Error desconocido!', error );
    } finally {
        if (db) {
            await db.close();
        }
    }
}

