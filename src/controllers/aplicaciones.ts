import { Request, Response } from 'express';
import * as service from '../services/aplicaciones';
import * as bitacora from '../services/historial';

export const getAplicacion = async (req: Request, res: Response): Promise<any> => {
    const { idAplicacion, _idCredencial } = req.params;
    try {
        const response = await service.getAplicacion(idAplicacion);
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','2', idAplicacion ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getAplicaciones = async (req: Request, res: Response) => {
    
    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getAplicaciones( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','2','*','Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch ( error : any ) {
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteAplicacion = async (req: Request, res: Response): Promise<any> => {
    
    const { idAplicacion, _idCredencial } = req.params;
    try {
        await service.deleteAplicacion(idAplicacion);
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','4', idAplicacion ,'Succes' );
        res.status(204).json({});
    } catch (error : any ) {
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','4', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }

};

export const insertAplicacion = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { clave, nombre, redireccion } = req.body;
    try {
        const response = await service.insertAplicacion(clave, nombre, redireccion);
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','1', response.idAplicacion ,'Succes' );
        res.status(201).json(response);
    } catch ( error : any ) {
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','1', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};


export const updateAplicacion = async (req: Request, res: Response): Promise<any> => {
    
    const { idAplicacion, _idCredencial } = req.params;
    const { clave, nombre, redireccion } = req.body;
    try {
        await service.updateAplicacion(idAplicacion, clave, nombre, redireccion);
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','3', idAplicacion ,'Succes' );
        res.status(204).json({});
    } catch ( error : any) {
        bitacora.insertHistorial( _idCredencial,'sso','Aplicaciones','3', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

