import { Request, Response } from 'express';
import * as rolService from '../services/rolService';

export const getRoles = async (req: Request, res: Response) => {
    try {
        const response = await rolService.getRoles();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const getRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = req.params.idRol;
        const response = await rolService.getRol(idRol);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = req.params.idRol;
        await rolService.deleteRol(idRol);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        await rolService.insertRol(clave, nombre);
        res.status(201).json({ response: 'El nueveo rol ha sido agregado exitosamente!' });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const updateRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = req.params.idRol;
        const { clave, nombre } = req.body;
        await rolService.updateRol(idRol, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};
