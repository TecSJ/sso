import { Request, Response } from 'express';
import * as moduloService from '../services/moduloService';

export const getAllModulos = async (req: Request, res: Response) => {
    try {
        const data = await moduloService.getAllModulos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, estado } = req.body;
        const data = await moduloService.insertModulo(clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getModulosById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idModulo = parseInt(req.params.idModulo);
        if (isNaN(idModulo)) {
            return res.status(400).json({ error: 'idModulo inválido:' });
        }
        const data = await moduloService.getModuloById(idModulo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateModulosById = async (req: Request, res: Response) => {
    try {
        const data = await moduloService.getAllModulos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteModulosById = async (req: Request, res: Response) => {
    try {
        const data = await moduloService.getAllModulos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
