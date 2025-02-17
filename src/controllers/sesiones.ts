import { Request, Response } from 'express';
import * as service from '../services/sesiones';
import { Exception } from '../model/Exception';
import { Aplicacion } from '../types';


export const getSesion = async (req: Request, res: Response): Promise<any> => {
    const { curp, correo, celular, contrasena } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response = await service.getSesion(curp, correo, celular, contrasena);
        switch (response?.statusCode) {
            case 0:
                return res.status(200).json({ idCredencial: response.credencial, correo: response.correo, celular: response.celular });

            case 200:
                return res.status(200).json({ token: response.token });
            case 202:
                return res.status(202).json({
                    message: response.message,
                    actionRequired: response.actionRequired,
                    validationNeeded: response.validationNeeded,
                    authenticationNeeded: response.authenticationNeeded,
                    correo: response.correo,
                    celular: response.celular,
                    credencial: response.credencial
                });

            default:
                return res.status(400).json({ message: "Unexpected status code" });
        }
    } catch (error: any) {
        if (error instanceof Exception) {
            return res.status(parseInt(error.code)).json({ code: error.code, message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const getGoogle = async (req: Request, res: Response): Promise<any> => {

    const { correo } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response = await service.getGoogle(correo);
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(204).json({});
    }
    catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};


export const getValidacion = async (req: Request, res: Response): Promise<any> => {

    const { curp, correo, celular } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response = await service.getValidacion(curp, correo, celular );
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

export const getAuntenticacion = async (req: Request, res: Response): Promise<any> => {

    const { curp, correo, celular } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response = await service.getAutenticacion(curp, correo, celular );
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

export const deleteSesion = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    try {
        await service.deleteSession( idCredencial );
        return res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

export const setPassword = async (req: Request, res: Response): Promise<any> => {
    const { curp, correo, celular, contrasena } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if (X_API_KEY !== process.env.X_API_KEY) {
            throw new Exception('401', 'Falta api-key');
        }
        const response = await service.setPassword(curp, correo, celular, contrasena);
        if (response?.statusCode === 200) {
            return res.status(200).json({ token: response.token });
        } else {
            return res.status(204).json({});
        }
    } catch (error: any) {
        if (error instanceof Exception) {
            return res.status(parseInt(error.code)).json({ code: error.code, message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const getData = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Aplicacion[] | undefined = await service.getData( idCredencial, filtros, orden, limite, pagina);
        if (response && response.length > 0) {
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