import { Request, Response } from 'express';
import * as service from '../services/preferencias';

export const getPreferencias = async (req: Request, res: Response) => {
    try {
        const response = await service.getPreferencias();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idPreferencia } = req.params;
        const response = await service.getPreferencia(idPreferencia);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idPreferencia } = req.params;
        await service.deletePreferencia(idPreferencia);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertPreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial, twoNF, cambiarContrasena } = req.body;
        const response = await service.insertPreferencia(idCredencial, twoNF, cambiarContrasena);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idPreferencia } = req.params;
        const { idCredencial, twoNF, cambiarContrasena } = req.body;
        await service.updatePreferencia(idPreferencia, idCredencial, twoNF, cambiarContrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

