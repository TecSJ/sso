import { Request, Response } from 'express';
import * as grupoService from '../services/grupoService';

export const getAllGrupos = async (req: Request, res: Response) => {
    try {
        const data = await grupoService.getAllGrupos();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getGrupoById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = parseInt(req.params.idGrupo);
        if (isNaN(idGrupo)) {
            return res.status(400).json({ error: 'idGrupo inválido:' });
        }
        const data = await grupoService.getGrupoById(idGrupo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteOneGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = parseInt(req.params.idGrupo);
        if (isNaN(idGrupo)) {
            return res.status(400).json({ error: 'idGrupo inválido:' });
        }
        const data = await grupoService.deleteOneGrupo(idGrupo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, estado } = req.body;
        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido. Debe ser "Activo" ó "Inactivo"' });
        }
        const result = await grupoService.insertGrupo(clave, nombre, estado);
        res.json({ message: 'Grupo insertado con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
        const idGrupo = parseInt(req.params.idGrupo);
        if (isNaN(idGrupo)) {
            res.status(400).json({ error: 'idGrupo inválido:' });
            return;
        }
        const { clave, nombre } = req.body;
        const result = await grupoService.updateGrupo(idGrupo, clave, nombre);
        res.json({ message: 'Grupo actualizado con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
