import { Request, Response } from 'express';
import * as service from '../services/Parametros';

export const getParametro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idParametro } = req.params;
        const response = await service.getParametro(idParametro);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const getParametros = async (req: Request, res: Response) => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getParametros( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const updateParametro = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idParametro } = req.params;
        const { valor } = req.body;
        await service.updateParametro( idParametro, valor );
        res.status(204).json({});
    } catch ( error : any) {
        res.status(500).json({ message: error.message });
    }
};

