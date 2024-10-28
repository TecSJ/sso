import { Request, Response } from 'express';
import * as service from '../services/modulos';
import { Exception } from '../model/Exception';
import { Modulo } from '../types';

export const getModulo = async (req: Request, res: Response): Promise<any> => {

    const { idModulo } = req.params;
    try {
        const response: Modulo | undefined =  await service.getModulo(idModulo);
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

export const getModulos = async (req: Request, res: Response): Promise<any> => {

    const { idAplicacion } = req.params;
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
        const response: Modulo[] | undefined = await service.getModulos( _filtros , orden, limite, pagina );
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


export const deleteModulo = async (req: Request, res: Response): Promise<any> => {

    const { idModulo } = req.params;
    try {
        const affectedRows: number = await service.deleteModulo(idModulo);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {

    const { idAplicacion } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response: Modulo | undefined =  await service.insertModulo(idAplicacion, clave, nombre);
        return res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const updateModulo = async (req: Request, res: Response): Promise<any> => {

    const { idModulo } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response: Modulo | undefined = await service.uptateModulo( idModulo, clave, nombre);
        return res.status(204).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};
