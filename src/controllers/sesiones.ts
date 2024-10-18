import { Request, Response } from 'express';
import * as service from '../services/sesiones';

export const getSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { curp, correo, celular, contrasena } = req.body;
        const response = await service.getSesion( curp, correo, celular, contrasena );
        if ( response ){
            res.status(200).json({ token: response });
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idSesion } = req.params;
        await service.deleteSesion( idSesion );
        res.status(204).json({});
    } catch (error : any ) {
        res.status(500).json({ message: error.message });
    }
};