import { Request, Response } from 'express';
import * as service from '../services/modulos';


export const getModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idModulo } = req.params;
        const response = await service.getModulo(idModulo);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getModulos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion } = req.params;
        const { filtros, orden, limite, pagina } = req.body;
        let _filtros = filtros || '';
        if (idAplicacion) {
            if (_filtros) {
                _filtros += `,idAplicacion:eq:${idAplicacion}`;
            } else {
                _filtros = `idAplicacion:eq:${idAplicacion}`;
            }
        }
        const response = await service.getModulos( _filtros , orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteModulo = async (req: Request, res: Response) => {
    try {
        const { idModulo } = req.params;
        await service.deleteModulo(idModulo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertModulo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idAplicacion } = req.params;
        const { clave, nombre } = req.body;
        const response = await service.insertModulo(idAplicacion, clave, nombre);
        res.status(201).json( response );
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateModulo = async (req: Request, res: Response) => {
    try {
        const { idModulo } = req.params;
        const { clave, nombre } = req.body;
        await service.uptateModulo( idModulo, clave, nombre);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
