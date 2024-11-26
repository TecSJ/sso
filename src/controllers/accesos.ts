import { Request, Response } from 'express';
import * as service from '../services/accesos';
import { Exception } from '../model/Exception';
import { Acceso } from '../types';

export const getAccesos = async (req: Request, res: Response): Promise<any> => {
    const { idRol } = req.params;
    try {
        const response: Acceso | undefined = await service.getAccesos(idRol);
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


export const addAccesos = async (req: Request, res: Response): Promise<any> => {

    const { idRol } = req.params;
    const { idModulo, Crear, Consultar, Actualizar, Eliminar, Subir } = req.body;
    try {
        const response: Acceso | undefined =  await service.addAccesos( idRol, idModulo, Crear, Consultar, Actualizar, Eliminar, Subir);
        res.status(201).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};


