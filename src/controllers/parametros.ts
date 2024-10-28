import { Request, Response } from 'express';
import * as service from '../services/parametros';
import { Exception } from '../model/Exception';
import { Parametro } from '../types';

export const getParametro = async (req: Request, res: Response): Promise<any> => {
    
    const { idParametro } = req.params;
    try {
        const response: Parametro | undefined = await service.getParametro(idParametro);
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch (error : any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getParametros = async (req: Request, res: Response): Promise<any> => {

    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Parametro[] | undefined = await service.getParametros( filtros, orden, limite, pagina );
        if (response && response.length > 0) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    } catch ( error : any ) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const updateParametro = async (req: Request, res: Response): Promise<any> => {

    const { idParametro } = req.params;
    try {
        const { valor } = req.body;
        const response: Parametro | undefined = await service.updateParametro( idParametro, valor );
        res.status(204).json(response);
    } catch ( error : any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

