import { Request, Response } from 'express';
import * as service from '../services/accesos';
import * as bitacora from '../services/historial';

export const getAcceso = async (req: Request, res: Response): Promise<any> => {
    const { idRol, _idCredencial } = req.params;
    const { idModulo } = req.body;
    try {
        const response = await service.getAcceso(idRol,idModulo);
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','2', '?' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getAccesos = async (req: Request, res: Response): Promise<any> => {
    
    const { idRol, _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idRol) {
            if (_filtros) {
                _filtros += `,idRol:eq:${idRol}`;
            } else {
                _filtros = `idRol:eq:${idRol}`;
            }
        }
        const response = await service.getAccesos( _filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','2','*','Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteAcceso = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    const { idModulo } = req.body;
    try {
        await service.deleteAcceso( idRol, idModulo);
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','4', '?' ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','4',  error.message ,'Succes' );
        res.status(500).json({ message: error.message });
    }
};

export const insertAcceso = async (req: Request, res: Response): Promise<any> => {

    const { idRol, _idCredencial } = req.params;
    const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
    try {
        const response = await service.insertAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','1', response.idAcceso ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','1',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};


export const updateAcceso = async (req: Request, res: Response): Promise<any> => {
    
    const { idRol, _idCredencial } = req.params;
    const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
    try {
        await service.updateAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','3', '?','Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Accesos','3', error.message,'Succes' );
        res.status(500).json({ message: error.message });
    }
};

