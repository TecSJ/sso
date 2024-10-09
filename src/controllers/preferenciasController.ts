import { Request, Response } from 'express';
import * as preferenciasService from '../services/preferenciaService';

export const getPreferencias = async (req: Request, res: Response) => {
    try {
        const response = await preferenciasService.getPreferencias();
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message.message });
    }
};

export const getPreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const idPreferencia = req.params.idPreferencia;
        const response = await preferenciasService.getPreferencia(idPreferencia);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deletePreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const idPreferencia = req.params.idPreferencia;
        await preferenciasService.deletePreferencia(idPreferencia);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertPreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial, twoNF, cambiarContrasena } = req.body;
        const response = await preferenciasService.insertPreferencia(idCredencial, twoNF, cambiarContrasena);
        res.status(201).json({ response: 'La nueva preferencia ha sido agregada exitosamente!' });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};


export const updatePreferencia = async (req: Request, res: Response): Promise<any> => {
    try {
        const idPreferencia = req.params.idPreferencia;
        const { idCredencial, twoNF, cambiarContrasena } = req.body;
        await preferenciasService.updatePreferencia(idPreferencia, idCredencial, twoNF, cambiarContrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

