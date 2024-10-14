import { Request, Response } from 'express';
import * as service from '../services/perfiles';

export const getPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const response = await service.getPerfil( idRol );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerfiles = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getPerfiles( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePerfil = async (req: Request, res: Response) => {
    try {
        const { idRol } = req.params;
        const { idCredencial } = req.body;
        await service.deletePerfil( idRol, idCredencial );
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { idCredencial } = req.body;
        const response = await service.insertPerfil(idRol, idCredencial);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};