import { Request, Response } from 'express';
import * as service from '../services/codigos';

export const getCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCodigo } = req.params;
        const response = await service.getCodigo(idCodigo);
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCodigos = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { filtros, orden, limite, pagina } = req.body;
        let _filtros = filtros || '';
        if (idCredencial) {
            if (_filtros) {
                _filtros += `,idCredencial:eq:${idCredencial}`;
            } else {
                _filtros = `idCredencial:eq:${idCredencial}`;
            }
        }
        const response = await service.getCodigos( _filtros, orden, limite, pagina );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const insertCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { idCredencial } = req.params;
        const { tipo, medio, destinatario } = req.body;
        
        if ( !destinatario ) {
            return res.status(400).json({ message: "El destinatario es un campo obligatorio." });
        }
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (medio === "Correo") {
            if (!correoRegex.test(destinatario)) {
                return res.status(400).json({ message: "El destinatario debe ser un correo electrónico válido." });
            }
        }
        const celularRegex = /^\d{2}-\d{10}$/;
        if (medio === "Celular") {
            if (!celularRegex.test(destinatario)) {
                return res.status(400).json({ message: "El destinatario debe tener el formato ##-##########." });
            }
        }
        const response = await service.insertCodigo( idCredencial, tipo, medio, destinatario );
        res.status(201).json(response);
    } catch ( error : any ) {
        res.status(500).json({ message: error.message });
    }
};

