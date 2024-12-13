import { Request, Response } from 'express';
import * as service from '../services/roles';
import { Exception } from '../model/Exception';
import { Rol } from '../types';

export const getRol = async (req: Request, res: Response): Promise<any> => {

    const { idRol } = req.params;
    try {
        const response: Rol | undefined = await service.getRol(idRol);
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getRoles = async (req: Request, res: Response): Promise<any> => {

    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Rol[] | undefined =await service.getRoles( filtros, orden, limite, pagina );
        if (response && response.length > 0) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const deleteRol = async (req: Request, res: Response): Promise<any> => {
    const { idRol } = req.params;
    const idRoles = idRol.split(',').map(Number);
    try {
        const affectedRows: number =  await service.deleteRol(idRoles);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertRol = async (req: Request, res: Response): Promise<any> => {

    const { clave, nombre } = req.body;
    try {
        const response: Rol | undefined =  await service.insertRol(clave, nombre);
        return res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const updateRol = async (req: Request, res: Response): Promise<any> => {

    const { idRol } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response: Rol | undefined = await service.updateRol(idRol, clave, nombre);
        return res.status(204).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getDescarga = async (_req: Request, res: Response): Promise<void> => {
    try {
        const contenidoCSV = await service.generarCSV();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="roles.csv"');
        res.status(200).send(contenidoCSV);
    } catch (error: any) {
        console.error('Error en getDescarga:', error.message || error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getRolselec = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    try {
        const response: Rol[] | undefined = await service.getRolselec(idCredencial);
        if (response && response.length > 0) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json({
                message: `No se encontraron roles para la credencial con ID ${idCredencial}`,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};