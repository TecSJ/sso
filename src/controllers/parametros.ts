import { Request, Response } from 'express';
import * as service from '../services/parametros';
import * as bitacora from '../services/historial';
import { Exception } from '../model/Exception';

export const getParametro = async (req: Request, res: Response): Promise<any> => {
    
    const { idParametro, _idCredencial } = req.params;
    try {
        const response = await service.getParametro(idParametro);
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','2', idParametro ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const getParametros = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getParametros( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch ( error : any ) {
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','2',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const updateParametro = async (req: Request, res: Response): Promise<any> => {

    const { idParametro, _idCredencial } = req.params;
    try {
        const { valor } = req.body;
        await service.updateParametro( idParametro, valor );
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','3', idParametro ,'Succes' );
        res.status(204).json({});
    } catch ( error : any) {
        bitacora.insertHistorial( _idCredencial,'sso','Parametros','3',  error.message ,'Fail' );
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

