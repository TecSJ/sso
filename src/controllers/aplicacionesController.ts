import { Request, Response } from 'express';
import * as aplicacionesService from '../services/aplicacionService';

export const getAllAplicaciones = async (req: Request, res: Response) => {
    try {
        const data = await aplicacionesService.getAllAplicaciones();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getAplicacionById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = parseInt(req.params.idAplicacion);
        if (isNaN(idAplicacion)) {
            return res.status(400).json({ error: 'idAplicacion inválido:' });
        }
        const data = await aplicacionesService.getAplicacionById(idAplicacion);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteAplicacionById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = parseInt(req.params.idAplicacion);
        if (isNaN(idAplicacion)) {
            return res.status(400).json({ error: 'idAplicacion inválido:' });
        }
        const data = await aplicacionesService.deleteAplicacionById(idAplicacion);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertAplicacion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, redireccion, estado } = req.body;
        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido. Debe ser "Activo" ó "Inactivo"' });
        }
        const result = await aplicacionesService.insertAplicacion(clave, nombre, redireccion, estado);
        res.json({ message: 'Aplicación insertada con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateAplicacionById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idAplicacion = parseInt(req.params.idAplicacion);
        if (isNaN(idAplicacion)) {
            res.status(400).json({ error: 'idAplicacion inválido:' });
            return;
        }
        const { clave, nombre, redireccion } = req.body;
        const result = await aplicacionesService.updateAplicacionById(idAplicacion, clave, nombre, redireccion);
        res.json({ message: 'Aplicación actualizada con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
