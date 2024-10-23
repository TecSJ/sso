import { Request, Response } from 'express';
import * as service from '../services/roles';
import * as bitacora from '../services/historial';

export const getRol = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    try {
        const response = await service.getRol(idRol);
        bitacora.insertHistorial( _idCredencial,'sso','Roles','2', idRol ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Roles','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getRoles = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getRoles( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Roles','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Roles','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteRol = async (req: Request, res: Response): Promise<any> => {
    
    const { idRol, _idCredencial } = req.params;
    try {
        await service.deleteRol(idRol);
        bitacora.insertHistorial( _idCredencial,'sso','Roles','4', idRol ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Roles','4',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const insertRol = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response = await service.insertRol(clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Roles','1', response.idRol ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Roles','1',  error.message, 'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const updateRol = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        await service.updateRol(idRol, clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Roles','3', idRol ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Roles','3',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};
