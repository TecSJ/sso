import { Request, Response } from 'express';
import * as grupoService from '../services/grupoService';

export const getGrupos = async (req: Request, res: Response) => {
    try {
        const response = await grupoService.getGrupos();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const getGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = req.params.idGrupo;
        const response = await grupoService.getGrupo(idGrupo);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = req.params.idGrupo;
        await grupoService.deleteGrupo(idGrupo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        await grupoService.insertGrupo(clave, nombre);
        res.status(201).json({ response: 'El nuevo grupo ha sido agregado exitosamente!'} );
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const updateGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = req.params.idGrupo;
        const { clave, nombre } = req.body;
        await grupoService.updateGrupo(idGrupo, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};
