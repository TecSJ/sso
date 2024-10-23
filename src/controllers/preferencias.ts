import { Request, Response } from 'express';
import * as service from '../services/preferencias';
import * as bitacora from '../services/historial';

export const getPreferencia = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial, _idCredencial } = req.params;
    try {
        const response = await service.getPreferencia(idCredencial);
        bitacora.insertHistorial( _idCredencial,'sso','Preferencias','2', '?' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Preferencias','2',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const updatePreferencia = async (req: Request, res: Response): Promise<any> => {
    
    const { idCredencial, _idCredencial } = req.params;
    const { dobleFactor, cambiarContrasena } = req.body;
    try {
        await service.updatePreferencia( idCredencial, dobleFactor, cambiarContrasena);
        bitacora.insertHistorial( _idCredencial,'sso','Preferencias','3', '?' ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Preferencias','3',  error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

