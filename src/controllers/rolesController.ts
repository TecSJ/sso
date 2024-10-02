import { Request, Response } from 'express';
import * as rolService from '../services/rolService';

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const data = await rolService.getAllRoles();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getRolById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = parseInt(req.params.idRol);
        if (isNaN(idRol)) {
            return res.status(400).json({ error: 'idRol inválido:' });
        }
        const data = await rolService.getRolById(idRol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteRolById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = parseInt(req.params.idRol);
        if (isNaN(idRol)) {
            return res.status(400).json({ error: 'idRol inválido:' });
        }
        const data = await rolService.deleteRolById(idRol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const insertRol = async (req: Request, res: Response): Promise<any> => {
    try {
        const { clave, nombre, estado } = req.body;
        if (!['Activo', 'Inactivo'].includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido. Debe ser "Activo" ó "Inactivo"' });
        }
        const result = await rolService.insertRol(clave, nombre, estado);
        res.json({ message: 'Rol insertado con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateRolById = async (req: Request, res: Response): Promise<any> => {
    try {
        const idRol = parseInt(req.params.idRol);
        if (isNaN(idRol)) {
            res.status(400).json({ error: 'idRol inválido:' });
            return;
        }
        const { clave, nombre } = req.body;
        const result = await rolService.updateRolById(idRol, clave, nombre);
        res.json({ message: 'Rol actualizado con éxito', result });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
