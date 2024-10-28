import { Request, Response } from 'express';
import * as service from '../services/accesos';
import { Exception } from '../model/Exception';
import { Acceso } from '../types';

export const getAcceso = async (req: Request, res: Response): Promise<any> => {
    const { idRol } = req.params;
    const { idModulo } = req.body;
    try {
        const response: Acceso | undefined = await service.getAcceso(idRol,idModulo);
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getAccesos = async (req: Request, res: Response): Promise<any> => {
    
    const { idRol } = req.params;
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
        const response: Acceso[] | undefined = await service.getAccesos( _filtros, orden, limite, pagina );
        if (response && response.length > 0) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const deleteAcceso = async (req: Request, res: Response): Promise<any> => {

    const { idRol } = req.params;
    const { idModulo } = req.body;
    try {
        const affectedRows: number = await service.deleteAcceso( idRol, idModulo);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertAcceso = async (req: Request, res: Response): Promise<any> => {

    const { idRol } = req.params;
    const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
    try {
        const response: Acceso | undefined =  await service.insertAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};


export const updateAcceso = async (req: Request, res: Response): Promise<any> => {
    
    const { idRol } = req.params;
    const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
    try {
        const response: Acceso | undefined = await service.updateAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        return res.status(204).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

