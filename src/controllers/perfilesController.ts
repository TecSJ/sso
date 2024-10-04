import { Request, Response } from 'express';
import * as perfilesService from '../services/perfilesService';

export const getAllPerfiles = async (req: Request, res: Response) => {
    try {
        const data = await perfilesService.getAllPerfiles();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const data = await perfilesService.insertPerfil(clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getPerfilesById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        if (isNaN(idPerfil)) {
            return res.status(400).json({ error: 'idPerfil inválido:' });
        }
        const data = await perfilesService.getPerfilById(idPerfil);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updatePerfilesById = async (req: Request, res: Response) => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        if (isNaN(idPerfil)) {
            res.status(400).json({ error: 'idPerfil inválido:' });
            return;
        }
        const { clave, nombre } = req.body;
        const data = await perfilesService.uptatePerfil(idPerfil, clave, nombre);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deletePerfilesById = async (req: Request, res: Response) => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        if (isNaN(idPerfil)) {
            res.status(400).json({ error: 'idPerfil inválido:' });
            return;
        }
        const data = await perfilesService.deletePerfil(idPerfil);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};