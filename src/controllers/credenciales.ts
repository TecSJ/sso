import { Request, Response } from 'express';
import * as service from '../services/credenciales';
import { Exception } from '../model/Exception';
import { Credencial } from '../types';

export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial } = req.params;
    try {
        const response: Credencial | undefined = await service.getCredencial(idCredencial);
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

export const getCredenciales = async (req: Request, res: Response): Promise<any> => {

    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response: Credencial[] | undefined = await service.getCredenciales( filtros, orden, limite, pagina );
        if (response && response.length > 0) {
            return res.status(200).json(response);
        }
        return  res.status(204).json({});
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const deleteCredencial = async (req: Request, res: Response): Promise<any> =>{
    const { idCredencial } = req.params;
    const idCredenciales = idCredencial.split(',').map(String);
    try {
        const affectedRows: number =  await service.deleteCredencial(idCredenciales);
        return res.status(204).json({ 'affectedRows': affectedRows});
    } catch (error: any) {
        return res.status(500).json({
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
        const response: Credencial | undefined =  await service.insertCredencial( curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, contrasena, tipo );
        await service.insertMoodle(curp, contrasena, nombre, primerApellido, segundoApellido, correo, "General", "General");
        return res.status(201).json({ idCredencial: response?.idCredencial, curp: curp, nombre: nombre, primerApellido: primerApellido, segundoApellido: segundoApellido, correo: correo, celular: celular, tipo: tipo  });
    } catch (error: any) {
        return res.status(500).json({
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
        return res.status(204).json(response);
    } catch (error: any) {
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
};

export const getDescarga = async (_req: Request, res: Response): Promise<void> => {
    try {
        const contenidoCSV = await service.generarCSV();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="credenciales.csv"');
        res.status(200).send(contenidoCSV);
    } catch (error: any) {
        console.error('Error en getDescarga:', error.message || error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
};