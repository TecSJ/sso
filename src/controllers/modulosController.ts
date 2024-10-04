import { Request, Response } from 'express';
import * as modulosService from '../services/modulosService';

export const getAllModulos = async (req: Request, res: Response) => {
    try {
        const data = await modulosService.getAllModulos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion, clave, nombre } = req.body;
        if(!clave || !nombre){
            return res.status(400).json({ error: 'faltan datos...' });
        }
        const data = await modulosService.insertModulo(idAplicacion, clave, nombre);
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
        const data = await modulosService.getModuloById(idModulo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateModulosById = async (req: Request, res: Response) => {
    try {
        const idModulo = parseInt(req.params.idModulo);
        if (isNaN(idModulo)) {
            res.status(400).json({ error: 'idModulo inválido:' });
            return;
        }
        const { idAplicacion, clave, nombre } = req.body;
        const data = await modulosService.uptateModulo(idModulo, idAplicacion, clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteModulosById = async (req: Request, res: Response) => {
    try {
        const idModulo = parseInt(req.params.idModulo);
        if (isNaN(idModulo)) {
            res.status(400).json({ error: 'idModulo inválido:' });
            return;
        }
        const data = await modulosService.deleteModulo(idModulo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
