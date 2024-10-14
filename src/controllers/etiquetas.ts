import { Request, Response } from 'express';
import * as service from '../services/etiquetas';

export const getEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idEtiqueta } = req.params;
        const response = await service.getEtiqueta( idEtiqueta);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getEtiquetas = async (req: Request, res: Response): Promise<any> => {
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
        const response = await service.getEtiquetas( _filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idEtiqueta } = req.params;
        await service.deleteEtiqueta(idEtiqueta);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idGrupo } = req.params;
        const { nombre } = req.body;
        const response = await service.insertEtiqueta( idGrupo, nombre );
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateEtiqueta = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idEtiqueta } = req.params;
        const { nombre } = req.body;
        await service.updateEtiqueta( idEtiqueta, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

