import { Request, Response } from 'express';
import { Exception } from '../model/Exception';
import { generarLlave, registrarLlave, validarLlave, firmarServicio } from '../services/firmas';
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
export const firmarArchivoController = async (req: Request, res: Response) => {
  try {
    const file = req.file; 
    const { data, passphrase } = req.body;

    if (!file || !data || !passphrase) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const privateKeyPem = fs.readFileSync(file.path, 'utf-8');
    const firma = firmarServicio(data, privateKeyPem, passphrase);


    fs.unlinkSync(file.path);

    return res.status(200).json({ firma });
  } catch (error: any) {
    return res.status(500).json({
      code: error instanceof Exception ? error.code : 500,
      message: error.message || 'Error interno del servidor',
    });
  }
};