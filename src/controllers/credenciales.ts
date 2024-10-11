import { Request, Response } from 'express';
import * as service from '../services/credenciales';

export const getCredenciales = async (req: Request, res: Response) => {
    try {
        const response = await service.getCredenciales();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const response = await service.getCredencial(idCredencial);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const filterCredenciales = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.filterCredenciales( filtros, orden, limite, pagina );
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCredencial = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        await service.deleteCredencial(idCredencial);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { curp, usuario, correo, celular, contrasena } = req.body;
        const response = await service.insertCredencial(curp, usuario, correo, celular, contrasena);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCredencial = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        const { usuario, correo, celular, tipo } = req.body;
        await service.uptateCredencial(idCredencial, usuario, correo, celular, tipo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const setPassword = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        const { contrasena } = req.body;
        await service.setPassword(idCredencial, contrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

