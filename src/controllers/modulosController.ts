import { Request, Response } from 'express';
import * as modulosService from '../services/modulosService';

export const getModulos = async (req: Request, res: Response) => {
    try {
        const response = await modulosService.getModulos();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const getModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idModulo = req.params.idModulo;
        const response = await modulosService.getModulo(idModulo);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteModulo = async (req: Request, res: Response) => {
    try {
        const idModulo = req.params.idModulo;
        await modulosService.deleteModulo(idModulo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion, clave, nombre } = req.body;
        await modulosService.insertModulo(idAplicacion, clave, nombre);
        res.status(201).json({ response: 'El nuevo módulo ha sido agregado exitosamente!' });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const updateModulo = async (req: Request, res: Response) => {
    try {
        const idModulo = req.params.idModulo;
        const { idAplicacion, clave, nombre } = req.body;
        await modulosService.uptateModulo(idModulo, idAplicacion, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};
