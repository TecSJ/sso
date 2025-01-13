import { Request, Response } from 'express';
import * as service from '../services/etiquetas';
import { Exception } from '../model/Exception';
import { Etiqueta } from '../types';

export const getEtiqueta = async (req: Request, res: Response): Promise<any> => {

    const { idEtiqueta } = req.params;
    try {
        const response: Etiqueta | undefined =  await service.getEtiqueta( idEtiqueta);
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

export const getEtiquetas = async (req: Request, res: Response): Promise<any> => {
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Etiqueta[] | undefined = await service.getEtiquetas(filtros, orden, limite, pagina);
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

export const addEtiquetas = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    const { etiquetas } = req.body;
    try {
        const response: Etiqueta[] | undefined = await service.addEtiquetas( idCredencial, etiquetas.split(',').map(String) );
        return res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};