import { Request, Response } from 'express';
import * as perfilesService from '../services/perfilesService';

export const getPerfiles = async (req: Request, res: Response) => {
    try {
        const response = await perfilesService.getPerfiles();
        res.status(200).json({ response: 'Consulta generada correctamente!', data: response });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const getPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        const response = await perfilesService.getPerfil(idPerfil);
        res.status(200).json({ response: 'Consulta generada correctamente!', data: response });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deletePerfil = async (req: Request, res: Response) => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        await perfilesService.deletePerfil(idPerfil);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const response = await perfilesService.insertPerfil(clave, nombre);
        res.status(201).json({ response: 'El nuevo perfil ha sido agregado exitosamente!', data: response });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const updatePerfil = async (req: Request, res: Response) => {
    try {
        const idPerfil = parseInt(req.params.idPerfil);
        const { clave, nombre } = req.body;
        await perfilesService.uptatePerfil(idPerfil, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};
