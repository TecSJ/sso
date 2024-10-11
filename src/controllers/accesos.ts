import { Request, Response } from 'express';
import * as service from '../services/accesos';

export const getAccesos = async (req: Request, res: Response) => {
    try {
        const response = await service.getAccesos();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAcceso } = req.params;
        const response = await service.getAcceso(idAcceso);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const filterAccesos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.filterAccesos( filtros, orden, limite, pagina );
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAcceso } = req.params;
        await service.deleteAcceso(idAcceso);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol, idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        const response = await service.insertAcceso(idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAcceso } = req.params;
        const { idRol, idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        await service.updateAcceso(idAcceso, idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

