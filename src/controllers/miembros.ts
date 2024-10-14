import { Request, Response } from 'express';
import * as service from '../services/miembros';

export const getMiembro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idMiembro } = req.params;
        const response = await service.getMiembro( idMiembro);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMiembros = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const { filtros, orden, limite, pagina } = req.body;
        let _filtros = filtros || '';
        if (idGrupo) {
            if (_filtros) {
                _filtros += `,idGrupo:eq:${idGrupo}`;
            } else {
                _filtros = `idGrupo:eq:${idGrupo}`;
            }
        }
        const response = await service.getMiembros( _filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMiembro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idMiembro } = req.params;
        await service.deleteMiembro(idMiembro);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertMiembro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const { idCredencial } = req.body;
        const response = await service.insertMiembro( idGrupo, idCredencial );
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateMiembro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idMiembro } = req.params;
        const { idGrupo } = req.body;
        await service.updateMiembro( idMiembro, idGrupo );
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

