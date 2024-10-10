import { Request, Response } from 'express';
import * as accesosService from '../services/accesoService';

export const getAccesos = async (req: Request, res: Response) => {
    try {
        const response = await accesosService.getAccesos();
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message.message });
    }
};

export const getAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAcceso = req.params.idAcceso;
        const response = await accesosService.getAcceso(idAcceso);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAcceso = req.params.idAcceso;
        await accesosService.deleteAcceso(idAcceso);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol, idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        const response = await accesosService.insertAcceso(idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(201).json({ response: 'El nuevo acceso ha sido agregado exitosamente!' });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};


export const updateAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAcceso = req.params.idAcceso;
        const { idRol, idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        await accesosService.updateAcceso(idAcceso, idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

