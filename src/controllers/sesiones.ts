import { Request, Response } from 'express';
import * as service from '../services/sesiones';
import { Exception } from '../model/Exception';

export const getSesion = async (req: Request, res: Response): Promise<any> => {

    const { curp, correo, celular, contrasena } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if( X_API_KEY != process.env.X_API_KEY ){
            throw new Error('Falta api-key!')
        }
        const response = await service.getSesion( curp, correo, celular, contrasena );
        if ( response ){
            res.status(200).json({ token: response });
        }else{
            res.status(204).json({});
        }
    } catch ( error : any) {
        if ( error instanceof Exception) {
            return res.status( parseInt(error.code)).json({ code: error.code, message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const deleteSesion = async (req: Request, res: Response): Promise<any> => {

    const { _idCredencial } = req.params;
    try {
        await service.deleteSession( _idCredencial );
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};