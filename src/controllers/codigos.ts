import { Request, Response } from 'express';
import * as service from '../services/codigos';
import * as bitacora from '../services/historial';

export const getCodigo = async (req: Request, res: Response): Promise<any> => {
    const { idCodigo, _idCredencial } = req.params;
    try {
        const response = await service.getCodigo(idCodigo);
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','2', idCodigo ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error : any) {
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','2', error.message ,'Succes' );
        res.status(500).json({ message: error.message });
    }
};

export const getCodigos = async (req: Request, res: Response): Promise<any> => {
    
    const { idCredencial, _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idCredencial) {
            if (_filtros) {
                _filtros += `,idCredencial:eq:${idCredencial}`;
            } else {
                _filtros = `idCredencial:eq:${idCredencial}`;
            }
        }
        const response = await service.getCodigos( _filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','2', error.message ,'Succes' );
        res.status(500).json({ message: error.message });
    }
};


export const insertCodigo = async (req: Request, res: Response): Promise<any> => {

    const { idCredencial, _idCredencial } = req.params;
    const { tipo, medio, destinatario } = req.body;
    try {        
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
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','1', response.idCodigo ,'Succes' );
        res.status(201).json(response);
    } catch ( error : any ) {
        bitacora.insertHistorial( _idCredencial,'sso','Codigos','1', error.message ,'Succes' );
        res.status(500).json({ message: error.message });
    }
};

