import { Request, Response } from 'express';
import { Exception } from '../model/Exception';
import { generarLlave } from '../services/firmas';
import fs from 'fs';

export const crearFirma = async (req: Request, res: Response): Promise<any> => {
    const {data, passphrase} = req.params;

    try{
        

        const rutaArchivo = await generarLlave(passphrase, "llave", data);

        res.download(rutaArchivo, "llave.pem", (err) => {
            if (err) {
                console.log("no se pudo descargar")
            }
            fs.unlinkSync(rutaArchivo);
        });

        //res.status(200).json({ok: true})
    }catch(error: any){
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
}