import { Request, Response } from 'express';
import * as credencialesService from '../services/credencialesService';

export const getAllCredenciales = async (req: Request, res: Response) => {
    try {
        const data = await credencialesService.getAllCredenciales();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const data = await credencialesService.insertCredencial(clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getCredencialesById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idCredencial = parseInt(req.params.idCredencial);
        if (isNaN(idCredencial)) {
            return res.status(400).json({ error: 'idCredencial inválido:' });
        }
        const data = await credencialesService.getCredencialById(idCredencial);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateCredencialesById = async (req: Request, res: Response) => {
    try {
        const idCredencial = parseInt(req.params.idCredencial);
        if (isNaN(idCredencial)) {
            res.status(400).json({ error: 'idCredencial inválido:' });
            return;
        }
        const { clave, nombre } = req.body;
        const data = await credencialesService.uptateCredencial(idCredencial, clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteCredencialesById = async (req: Request, res: Response) => {
    try {
        const idCredencial = parseInt(req.params.idCredencial);
        if (isNaN(idCredencial)) {
            res.status(400).json({ error: 'idCredencial inválido:' });
            return;
        }
        const data = await credencialesService.deleteCredencial(idCredencial);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};