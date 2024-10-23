import { Request, Response } from 'express';
import * as service from '../services/perfiles';
import * as bitacora from '../services/historial';
import { Exception } from '../model/Exception';

export const getPerfil = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    try {
        const response = await service.getPerfil( idRol );
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','2', '?' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const getPerfiles = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getPerfiles( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const deletePerfil = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    const { idCredencial } = req.body;
    try {
        await service.deletePerfil( idRol, idCredencial );
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','4', '?' ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','4',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const insertPerfil = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    const { idCredencial } = req.body;
    try {
        const response = await service.insertPerfil(idRol, idCredencial);
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','1', response.idPerfil ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Perfiles','1',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};