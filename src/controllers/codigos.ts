import { Request, Response } from 'express';
import * as service from '../services/codigos';
import { Exception } from '../model/Exception';
import { Codigo } from '../types';

export const getCodigo = async (req: Request, res: Response): Promise<any> => {
    const { idCodigo } = req.params;
    try {
        const response: Codigo | undefined =  await service.getCodigo(idCodigo);
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error : any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getCodigos = async (req: Request, res: Response): Promise<any> => {
    
    const { idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idCredencial) {
            if (_filtros) {
                _filtros += `,idCredencial:eq:${idCredencial}`;
            } else {
                _filtros = `idCredencial:eq:${idCredencial}`;
            }
        }
        const response: Codigo[] | undefined = await service.getCodigos( _filtros, orden, limite, pagina );
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

export const deleteCodigo = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    try {
        const affectedRows: number = await service.deleteCodigos(idCredencial);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};


export const insertCodigo = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    const { tipo, medio } = req.body;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response: Codigo | undefined = await service.insertCodigo( idCredencial, tipo, medio );
        res.status(201).json({ idCredencial: response?.idCredencial, medio: response?.medio, tipo: response?.tipo });
    } catch ( error : any ) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const validarCodigo = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial, codigo } = req.params;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    const { medio, tipo } = req.body;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response: Codigo | undefined =  await service.validarCodigo( idCredencial, codigo, medio, tipo );
        if (response) {
            await service.deleteCodigos(idCredencial);
            return res.status(200).json({ estatus: 'OK'});
        }
        return res.status(204).json({});
    } catch (error : any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};