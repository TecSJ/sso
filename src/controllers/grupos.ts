import { Request, Response } from 'express';
import * as service from '../services/grupos';

export const getGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const response = await service.getGrupo(idGrupo);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getGrupos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getGrupos( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        await service.deleteGrupo(idGrupo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre } = req.body;
        const response = await service.insertGrupo(clave, nombre);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const { clave, nombre } = req.body;
        await service.updateGrupo(idGrupo, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
