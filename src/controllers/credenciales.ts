import { Request, Response } from 'express';
import * as service from '../services/credenciales';
import * as bitacora from '../services/historial';

export const getCredencial = async (req: Request, res: Response): Promise<any> => {
    const { idCredencial, _idCredencial } = req.params;
    try {
        const response = await service.getCredencial(idCredencial);
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','2', idCredencial ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const getCredenciales = async (req: Request, res: Response): Promise<any> => {
    
    const { _idCredencial } = req.params;
    const { filtros, orden, limite, pagina } = req.body;
    try {
        const response = await service.getCredenciales( filtros, orden, limite, pagina );
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','2', '*' ,'Succes' );
        if ( response ){
            res.status(200).json(response);
        }else{
            res.status(204).json({});
        }
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','2', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const deleteCredencial = async (req: Request, res: Response) => {
    
    const { idCredencial, _idCredencial } = req.params;
    try {
        await service.deleteCredencial(idCredencial);
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','4', idCredencial ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','4', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const insertCredencial = async (req: Request, res: Response): Promise<any> => {
    
    const { _idCredencial } = req.params;
    const { curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, contrasena, tipo } = req.body;
    try {
        const response = await service.insertCredencial( curp, nombre, primerApellido, segundoApellido, fechaNacimiento, estadoNacimiento, correo, celular, contrasena, tipo );
        await service.insertMoodle(curp, contrasena, nombre, primerApellido, segundoApellido, correo, "General", "General");
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','1', response.idCredencial ,'Succes' );
        res.status(201).json(response);
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','1', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};


export const updateCredencial = async (req: Request, res: Response) => {

    const { idCredencial, _idCredencial } = req.params;
    const { curp, correo, celular, contrasena, tipo } = req.body;
    try {
        await service.uptateCredencial(idCredencial, curp, correo, celular, contrasena, tipo );
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','3', idCredencial ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','3', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

export const setPassword = async (req: Request, res: Response) => {

    const { idCredencial, _idCredencial } = req.params;
    const { contrasena } = req.body;
    try {
        await service.setPassword(idCredencial, contrasena);
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','5', idCredencial ,'Succes' );
        res.status(204).json({});
    } catch (error: any) {
        bitacora.insertHistorial( _idCredencial,'sso','Credenciales','5', error.message ,'Fail' );
        res.status(500).json({ message: error.message });
    }
};

