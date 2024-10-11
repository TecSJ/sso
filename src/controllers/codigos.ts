import { Request, Response } from 'express';
import * as service from '../services/codigos';

export const getCodigos = async (req: Request, res: Response) => {
    try {
        const response = await service.getCodigos();
        res.status(200).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const getCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCodigo } = req.params;
        const response = await service.getCodigo(idCodigo);
        res.status(200).json(response);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const filterCodigos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { filtros, orden, limite, pagina } = req.body;
        const response = await service.filterCodigos( filtros, orden, limite, pagina );
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCodigo } = req.params;
        await service.deleteCodigo(idCodigo);
        res.status(204).json({});
    } catch (error : any ) {
        res.status(500).json({ message: error.message });
    }
};

export const insertCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { clave, tipo, caducidad } = req.body;
        const response = await service.insertCodigo( idCredencial, clave, tipo, caducidad );
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial, idCodigo } = req.params;
        const { clave, tipo, caducidad } = req.body;
        await service.uptateCodigo( idCodigo, idCredencial, clave, tipo, caducidad );
        res.status(204).json({});
    } catch ( error : any) {
        res.status(500).json({ message: error.message });
    }
};

