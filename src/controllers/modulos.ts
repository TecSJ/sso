import { Request, Response } from 'express';
import * as service from '../services/modulos';
import * as bitacora from '../services/historial';

export const getModulo = async (req: Request, res: Response): Promise<any> => {

    const { idModulo, _idCredencial } = req.params;
    try {
        const response = await service.getModulo(idModulo);
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','2', idModulo ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getModulos = async (req: Request, res: Response): Promise<any> => {

    const { idAplicacion, _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idAplicacion) {
            if (_filtros) {
                _filtros += `,idAplicacion:eq:${idAplicacion}`;
            } else {
                _filtros = `idAplicacion:eq:${idAplicacion}`;
            }
        }
        const response = await service.getModulos( _filtros , orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};


export const deleteModulo = async (req: Request, res: Response) => {

    const { idModulo, _idCredencial } = req.params;
    try {
        await service.deleteModulo(idModulo);
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','4', idModulo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','4',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {

    const { idAplicacion, _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response = await service.insertModulo(idAplicacion, clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','1', response.idModulo ,'Succes' );
        res.status(201).json( response );
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','1',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const updateModulo = async (req: Request, res: Response) => {

    const { idModulo, _idCredencial } = req.params;
    const { clave, nombre } = req.body;
    try {
        await service.uptateModulo( idModulo, clave, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','3', idModulo ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Modulos','3',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};
