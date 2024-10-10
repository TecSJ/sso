import { Request, Response } from 'express';
import * as service from '../services/modulos';

export const getModulos = async (req: Request, res: Response) => {
    try {
        const response = await service.getModulos();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idModulo } = req.params;
        const response = await service.getModulo(idModulo);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteModulo = async (req: Request, res: Response) => {
    try {
        const { idModulo } = req.params;
        await service.deleteModulo(idModulo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion, clave, nombre } = req.body;
        const response = await service.insertModulo(idAplicacion, clave, nombre);
        res.status(201).json( response );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateModulo = async (req: Request, res: Response) => {
    try {
        const { idModulo } = req.params;
        const { idAplicacion, clave, nombre } = req.body;
        await service.uptateModulo( idModulo, idAplicacion, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
