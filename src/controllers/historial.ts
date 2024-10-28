import { Request, Response } from 'express';
import * as service from '../services/historial';
import { Exception } from '../model/Exception';


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
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const getBitacora = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getBitacora( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch ( error : any ) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};



export const insertHistorial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { idAplicacion, idModulo, accion, recurso, tipo } = req.body;
        const response = await service.insertHistorial( idCredencial, idAplicacion, idModulo, accion, recurso, tipo );
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};


