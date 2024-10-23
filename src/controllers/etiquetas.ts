import { Request, Response } from 'express';
import * as service from '../services/etiquetas';
import * as bitacora from '../services/historial';

export const getEtiqueta = async (req: Request, res: Response): Promise<any> => {
    
    const { idEtiqueta, _idCredencial } = req.params;
    try {
        const response = await service.getEtiqueta( idEtiqueta);
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','2', idEtiqueta ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getEtiquetas = async (req: Request, res: Response): Promise<any> => {
    
    const { idGrupo, _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        let _filtros = filtros || '';
        if (idGrupo) {
            if (_filtros) {
                _filtros += `,idGrupo:eq:${idGrupo}`;
            } else {
                _filtros = `idGrupo:eq:${idGrupo}`;
            }
        }
        const response = await service.getEtiquetas( _filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteEtiqueta = async (req: Request, res: Response): Promise<any> => {
    
    const { idEtiqueta, _idCredencial } = req.params;
    try {
        await service.deleteEtiqueta(idEtiqueta);
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','4', idEtiqueta ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','4', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const insertEtiqueta = async (req: Request, res: Response): Promise<any> => {
    
    const { idGrupo, _idCredencial } = req.params;
    const { nombre } = req.body;
    try {
        const response = await service.insertEtiqueta( idGrupo, nombre );
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','1', '?' ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','1', error.message,'Fail' );
        res.status(500).json({ message: error.message });
    }
};


export const updateEtiqueta = async (req: Request, res: Response): Promise<any> => {

    const { idEtiqueta, _idCredencial } = req.params;
    const { nombre } = req.body;
    try {
        await service.updateEtiqueta( idEtiqueta, nombre);
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','3', idEtiqueta ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Etiquetas','3', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

