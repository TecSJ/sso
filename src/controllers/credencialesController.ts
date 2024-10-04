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

        const { curp, usuario, correo, celular, contrasena } = req.body;
        const data = await credencialesService.insertCredencial(curp, usuario, correo, celular, contrasena);
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
        const idCredencial = req.params.idCredencial;
        const { usuario, correo, celular, tipo } = req.body;
        console.log(idCredencial, usuario, correo, celular, tipo)
        const data = await credencialesService.uptateCredencial(idCredencial, usuario, correo, celular, tipo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateContrasena = async (req: Request, res: Response) => {
    try {
        const idCredencial = parseInt(req.params.idCredencial);
        if (isNaN(idCredencial)) {
            res.status(400).json({ error: 'idCredencial inválido:' });
            return;
        }
        const { contrasena } = req.body;
        const data = await credencialesService.uptateContrasena(idCredencial, contrasena);
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