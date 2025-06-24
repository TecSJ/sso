import { Request, Response } from 'express';
import { Exception } from '../model/Exception';
import { generarLlave, registrarLlave, validarLlave } from '../services/firmas';
import fs from 'fs';

export const crearFirma = async (req: Request, res: Response): Promise<any> => {
    const {data, passphrase} = req.params;

    try{
        const validar = await validarLlave(data);
        if(validar){

            const rutaArchivo = await generarLlave(passphrase, "llave", data);

            res.download(rutaArchivo, "llave.pem", (err) => {
                if (err) {
                    console.log("no se pudo descargar")
                }
                registrarLlave("", data, process.env.LLAVES_DIR+data+"/llave_pub.pem")
                fs.unlinkSync(rutaArchivo);
            });
        }else{
            res.send("ERROR: Llave previamente generada");
        }
    }catch(error: any){
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
}