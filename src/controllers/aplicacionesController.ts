import { Request, Response } from 'express';
import * as aplicacionesService from '../services/aplicacionService';

export const getAplicaciones = async (req: Request, res: Response) => {
    try {
        const response = await aplicacionesService.getAplicaciones();
        res.status(200).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message.message });
    }
};

export const getAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = req.params.idAplicacion;
        const response = await aplicacionesService.getAplicacion(idAplicacion);
        res.status(200).json(response);
    } catch (error : any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = req.params.idAplicacion;
        await aplicacionesService.deleteAplicacion(idAplicacion);
        res.status(204).json({});
    } catch (error : any ) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, redireccion } = req.body;
        const response = await aplicacionesService.insertAplicacion(clave, nombre, redireccion);
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message.message });
    }
};


export const updateAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = req.params.idAplicacion;
        const { clave, nombre, redireccion } = req.body;
        await aplicacionesService.updateAplicacion(idAplicacion, clave, nombre, redireccion);
        res.status(204).json({});
    } catch ( error : any) {
        res.status(500).json({ message: error.message.message });
    }
};

