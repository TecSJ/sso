import { Request, Response } from 'express';
import * as service from '../services/perfiles';

export const getPerfiles = async (req: Request, res: Response) => {
    try {
        const response = await service.getPerfiles();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idPerfil } = req.params;
        const response = await service.getPerfil(idPerfil);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePerfil = async (req: Request, res: Response) => {
    try {
        const { idPerfil } = req.params;
        await service.deletePerfil(idPerfil);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const response = await service.insertPerfil(clave, nombre);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePerfil = async (req: Request, res: Response) => {
    try {
        const { idPerfil } = req.params;
        const { clave, nombre } = req.body;
        await service.uptatePerfil(idPerfil, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
