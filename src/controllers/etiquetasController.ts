import { Request, Response } from 'express';
import * as etiquetaService from '../services/etiquetaService';

export const getEtiquetas = async (req: Request, res: Response) => {
    try {
        const { idGrupo } = req.params;
        const response = await etiquetaService.getEtiquetas(idGrupo);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo, idEtiqueta } = req.params;
        const response = await etiquetaService.getEtiqueta(idGrupo, idEtiqueta);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo, idEtiqueta } = req.params;
        await etiquetaService.deleteEtiqueta(idGrupo, idEtiqueta);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const { nombre } = req.body;
        const response = await etiquetaService.insertEtiqueta(idGrupo, nombre);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo, idEtiqueta } = req.params;
        const { nombre } = req.body;
        await etiquetaService.updateEtiqueta(idGrupo, idEtiqueta, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

