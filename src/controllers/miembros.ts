import { Request, Response } from 'express';
import * as service from '../services/miembros';
import * as bitacora from '../services/historial';
import { Exception } from '../model/Exception';

export const getMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idMiembro, _idCredencial } = req.params;
    try {
        const response = await service.getMiembro( idMiembro);
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','2', idMiembro ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const getMiembros = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idGrupo) {
            if (_filtros) {
                _filtros += `,idGrupo:eq:${idGrupo}`;
            } else {
                _filtros = `idGrupo:eq:${idGrupo}`;
            }
        }
        const response = await service.getMiembros( _filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','2', error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const deleteMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idMiembro, _idCredencial } = req.params;
    try {
        await service.deleteMiembro(idMiembro);
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','4', idMiembro ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','4',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const insertMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo, _idCredencial } = req.params;
    const { idCredencial } = req.body;
    try {
        const response = await service.insertMiembro( idGrupo, idCredencial );
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','1', response.idMiembro ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','1',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};


export const updateMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idMiembro, _idCredencial } = req.params;
    const { idGrupo } = req.body;
    try {
        await service.updateMiembro( idMiembro, idGrupo );
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','3', idMiembro ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Miembros','3',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

