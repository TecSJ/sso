import { Request, Response } from 'express';
import * as service from '../services/asociacion';
import { Exception } from '../model/Exception';
import { Asociacion } from '../types';

export const getAsociacion = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    try {
        const response: Asociacion | undefined = await service.getAsociacion( idCredencial );
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

export const getAsociaciones = async (req: Request, res: Response): Promise<any> => {

    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Asociacion[] | undefined = await service.getAsociaciones( filtros, orden, limite, pagina );
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

export const deleteAsociacion = async (req: Request, res: Response): Promise<any> => {

    const { idEtiqueta } = req.params;
    const { idCredencial } = req.body;
    try {
        const affectedRows: number =  await service.deleteAsociacion( idEtiqueta, idCredencial );
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const upsertAsociacion = async (req: Request, res: Response): Promise<void> => {
    const { idCredencial } = req.params;
    const Asociaciones = req.body;

    try {
        const responses = [];
        for (const Asociacion of Asociaciones) {
            const { seleccionado, idEtiqueta } = Asociacion;
            const result = await service.upsertAsociacion(seleccionado, idEtiqueta, idCredencial);
            responses.push(result);
        }
        res.status(200).json(responses);
    } catch (error: any) {
        console.error("Error en upsertAsociacion:", error);
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || "Error interno del servidor",
        });
    }
};