import { Request, Response } from 'express';
import * as service from '../services/credenciales';

export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const response = await service.getCredencial(idCredencial);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCredenciales = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.getCredenciales( filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCredencial = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        await service.deleteCredencial(idCredencial);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const { curp, correo, celular, contrasena, tipo } = req.body;
        const response = await service.insertCredencial( curp, correo, celular, contrasena, tipo );
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCredencial = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        const { curp, correo, celular, contrasena, tipo } = req.body;
        await service.uptateCredencial(idCredencial, curp, correo, celular, contrasena, tipo );
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const setPassword = async (req: Request, res: Response) => {
    try {
        const { idCredencial } = req.params;
        const { contrasena } = req.body;
        await service.setPassword(idCredencial, contrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

