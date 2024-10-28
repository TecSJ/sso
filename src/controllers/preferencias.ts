import { Request, Response } from 'express';
import * as service from '../services/preferencias';
import { Exception } from '../model/Exception';
import { Preferencia } from '../types';

export const getPreferencia = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    try {
        const response: Preferencia | undefined =  await service.getPreferencia(idCredencial);
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

export const updatePreferencia = async (req: Request, res: Response): Promise<any> => {
    
    const { idCredencial } = req.params;
    const { dobleFactor, cambiarContrasena } = req.body;
    try {
        const response: Preferencia | undefined = await service.updatePreferencia( idCredencial, dobleFactor, cambiarContrasena);
        return res.status(204).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

