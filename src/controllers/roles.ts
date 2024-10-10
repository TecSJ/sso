import { Request, Response } from 'express';
import * as service from '../services/roles';

export const getRoles = async (req: Request, res: Response) => {
    try {
        const response = await service.getRoles();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const response = await service.getRol(idRol);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        await service.deleteRol(idRol);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const response = await service.insertRol(clave, nombre);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = req.params.idRol;
        const { clave, nombre } = req.body;
        await service.updateRol(idRol, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
