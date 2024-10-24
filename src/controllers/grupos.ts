import { Request, Response } from 'express';
import * as service from '../services/grupos';
import * as bitacora from '../services/historial';
import { Exception } from '../model/Exception';

export const getGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const response = await service.getGrupo(idGrupo);
    try {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','2', idGrupo ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const getGrupos = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getGrupos( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','2',  error.message ,'Succes' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const deleteGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    try {
        await service.deleteGrupo(idGrupo);
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','4', idGrupo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','4',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response = await service.insertGrupo(clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','1', response.idGrupo ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','1',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const updateGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        await service.updateGrupo(idGrupo, clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','3', idGrupo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Grupos','3',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};
