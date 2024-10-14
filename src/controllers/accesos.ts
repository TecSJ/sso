import { Request, Response } from 'express';
import * as service from '../services/accesos';

export const getAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { idModulo } = req.body;
        const response = await service.getAcceso(idRol,idModulo);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAccesos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { filtros, orden, limite, pagina } = req.body;
        let _filtros = filtros || '';
        if (idRol) {
            if (_filtros) {
                _filtros += `,idRol:eq:${idRol}`;
            } else {
                _filtros = `idRol:eq:${idRol}`;
            }
        }
        const response = await service.getAccesos( _filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { idModulo } = req.body;
        await service.deleteAcceso(idRol,idModulo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        const response = await service.insertAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAcceso = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idRol } = req.params;
        const { idModulo, accion1, accion2, accion3, accion4, accion5 } = req.body;
        await service.updateAcceso( idRol, idModulo, accion1, accion2, accion3, accion4, accion5);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

