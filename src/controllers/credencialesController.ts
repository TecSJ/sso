import { Request, Response } from 'express';
import * as credencialesService from '../services/credencialesService';

export const getCredenciales = async (req: Request, res: Response) => {
    try {
        const response = await credencialesService.getCredenciales();
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    try {

        const { curp, usuario, correo, celular, contrasena } = req.body;
        const response = await credencialesService.insertCredencial(curp, usuario, correo, celular, contrasena);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};


export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    try {
        const idCredencial = req.params.idCredencial;
        const response = await credencialesService.getCredencial(idCredencial);
        res.status(200).json({ response: 'Consulta generada correctamente!', data: response });
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const updateCredencial = async (req: Request, res: Response) => {
    try {
        const idCredencial = req.params.idCredencial;
        const { usuario, correo, celular, tipo } = req.body;
        await credencialesService.uptateCredencial(idCredencial, usuario, correo, celular, tipo);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const setPassword = async (req: Request, res: Response) => {
    try {
        const idCredencial = req.params.idCredencial;
        const { contrasena } = req.body;
        await credencialesService.setPassword(idCredencial, contrasena);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};

export const deleteCredencial = async (req: Request, res: Response) => {
    try {
        const idCredencial = req.params.idCredencial;
        await credencialesService.deleteCredencial(idCredencial);
        res.status(204).json({});
    } catch (error: any) {
        res.status(500).json({ message: error.message.message });
    }
};