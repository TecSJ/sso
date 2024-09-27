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