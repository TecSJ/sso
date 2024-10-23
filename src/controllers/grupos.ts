import { Request, Response } from 'express';
import * as service from '../services/grupos';
import * as bitacora from '../services/historial';

export const getGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const response = await service.getGrupo(idGrupo);
    try {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','2', idGrupo ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getGrupos = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','2', '*' ,'Succes' );
        const response = await service.getGrupos( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','2',  error.message ,'Succes' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    try {
        await service.deleteGrupo(idGrupo);
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','4', idGrupo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','4',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response = await service.insertGrupo(clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','1', response.idGrupo ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','1',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const updateGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        await service.updateGrupo(idGrupo, clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','3', idGrupo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupo','3',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};
