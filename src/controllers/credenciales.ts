import { Request, Response } from 'express';
import * as service from '../services/credenciales';
import { Exception } from '../model/Exception';
import { Credencial } from '../types';

export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    try {
        const response: Credencial | undefined = await service.getCredencial(idCredencial);
        if (response) {
            res.status(200).json(response);
        }
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getCredenciales = async (req: Request, res: Response): Promise<any> => {
    
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Credencial[] | undefined = await service.getCredenciales( filtros, orden, limite, pagina );
        if (response && response.length > 0) {
            res.status(200).json(response);
        }
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const deleteCredencial = async (req: Request, res: Response): Promise<any> =>{
    
    const { idCredencial } = req.params;
    try {
        const affectedRows: number =  await service.deleteCredencial(idCredencial);
        res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    
    const { curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, contrasena, tipo } = req.body;
    const X_API_KEY = req.headers['api_key'] as string | undefined;
    try {
        if( X_API_KEY != process.env.X_API_KEY ){
            throw new Error('Falta api-key!')
        }
        const response: Credencial =  await service.insertCredencial( curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, contrasena, tipo );
        await service.insertMoodle(curp, contrasena, nombre, primerApellido, segundoApellido, correo, "General", "General");
        res.status(201).json({ idCredencial: response.idCredencial, curp: curp, nombre: nombre, primerApellido: primerApellido, segundoApellido: segundoApellido, correo: correo, celular: celular, tipo: tipo  });
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};


export const updateCredencial = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial } = req.params;
    const { curp, correo, celular, contrasena, tipo } = req.body;
    try {
        const response: Credencial | undefined = await service.uptateCredencial(idCredencial, curp, correo, celular, contrasena, tipo );
        res.status(204).json(response);
    } catch (error: any) {
        res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

