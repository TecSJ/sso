import { Request, Response } from 'express';
import * as service from '../services/historial';

export const getHistorial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const response = await service.getHistorial(idCredencial);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBitacora = async (req: Request, res: Response) => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getBitacora( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const insertHistorial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { idAplicacion, idModulo, accion, recurso, tipo } = req.body;
        const response = await service.insertHistorial( idCredencial, idAplicacion, idModulo, accion, recurso, tipo );
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};


