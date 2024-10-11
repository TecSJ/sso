import { Request, Response } from 'express';
import * as service from '../services/aplicaciones';

export const getAplicaciones = async (req: Request, res: Response) => {
    try {
        const response = await service.getAplicaciones();
        res.status(200).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const getAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion } = req.params;
        const response = await service.getAplicacion(idAplicacion);
        res.status(200).json(response);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const filterAplicaciones = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.filterAplicaciones( filtros, orden, limite, pagina );
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion } = req.params;
        await service.deleteAplicacion(idAplicacion);
        res.status(204).json({});
    } catch (error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const insertAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, redireccion } = req.body;
        const response = await service.insertAplicacion(clave, nombre, redireccion);
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion } = req.params;
        const { clave, nombre, redireccion } = req.body;
        await service.updateAplicacion(idAplicacion, clave, nombre, redireccion);
        res.status(204).json({});
    } catch ( error : any) {
        res.status(500).json({ message: error.message });
    }
};

