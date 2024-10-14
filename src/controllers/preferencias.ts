import { Request, Response } from 'express';
import * as service from '../services/preferencias';

export const getPreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const response = await service.getPreferencia(idCredencial);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { dobleFactor, cambiarContrasena } = req.body;
        await service.updatePreferencia( idCredencial, dobleFactor, cambiarContrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

