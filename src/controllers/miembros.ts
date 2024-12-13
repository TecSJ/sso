import { Request, Response } from 'express';
import * as service from '../services/miembros';
import { Exception } from '../model/Exception';
import { Miembro } from '../types';

export const getMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idMiembro } = req.params;
    try {
        const response: Miembro | undefined = await service.getMiembro( idMiembro);
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

export const getMiembros = async (req: Request, res: Response): Promise<any> => {

    const { idGrupo } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idGrupo) {
            if (_filtros) {
                _filtros += `,idGrupo:eq:${idGrupo}`;
            } else {
                _filtros = `idGrupo:eq:${idGrupo}`;
            }
        }
        const response: Miembro[] | undefined = await service.getMiembros( _filtros, orden, limite, pagina );
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

export const deleteMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    const { idGrupo } = req.body;

    try {
        const affectedRows: number = await service.deleteMiembro(idGrupo, idCredencial);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertMiembro = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    const miembros = req.body;

    try {
        const responses = [];
        for (const perfil of miembros) {
            const { seleccionado, idGrupo } = perfil;
            const result = await service.insertMiembro(seleccionado, idCredencial, idGrupo);
            responses.push(result);
        }
        res.status(200).json(responses);
    } catch (error: any) {
        console.error("Error en insertMiembro:", error);
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || "Error interno del servidor",
        });
    }
};