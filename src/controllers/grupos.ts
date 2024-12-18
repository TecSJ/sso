import { Request, Response } from 'express';
import * as service from '../services/grupos';
import { Exception } from '../model/Exception';
import { Grupo } from '../types';

export const getGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo } = req.params;
    try {
        const response: Grupo | undefined = await service.getGrupo(idGrupo);
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

export const getGrupos = async (req: Request, res: Response): Promise<any> => {

    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Grupo[] | undefined = await service.getGrupos( filtros, orden, limite, pagina );
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

export const deleteGrupos = async (req: Request, res: Response): Promise<any> => {
    const { idGrupo } = req.params;
    const idGrupos = idGrupo.split(',').map(Number);
    try {
        const affectedRows: number = await service.deleteGrupos(idGrupos);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertGrupo = async (req: Request, res: Response): Promise<any> => {

    const { clave, nombre } = req.body;
    try {
        const response: Grupo | undefined =  await service.insertGrupo(clave, nombre);
        res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const updateGrupo = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo } = req.params;
    const { clave, nombre } = req.body;
    try {
        const response: Grupo | undefined = await service.updateGrupo(idGrupo, clave, nombre);
        res.status(204).json(response);
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
        res.setHeader('Content-Disposition', 'attachment; filename="grupos.csv"');
        res.status(200).send(contenidoCSV);
    } catch (error: any) {
        console.error('Error en getDescarga:', error.message || error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getGrupselec = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    try {
        const response: Grupo[] | undefined = await service.getGrupselec(idCredencial);
        if (response && response.length > 0) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json({
                message: `No se encontraron grupos para la credencial con ID ${idCredencial}`,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};