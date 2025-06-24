import { Request, Response } from 'express';
import { Exception } from '../model/Exception';
import * as service from '../services/firmas';
import fs from 'fs';

export const crearFirma = async (req: Request, res: Response): Promise<any> => {
    const {data, passphrase} = req.body;

    try{
        const validar = await service.validarLlave(data);
        if(validar){

            const rutaArchivo = await service.generarLlave(passphrase, "llave", data);

            res.download(rutaArchivo, "key.pem", (err) => {
                if (err) {
                    console.log("no se pudo descargar")
                }
                service.registrarLlave("", data, process.env.LLAVES_DIR+data+"/llave_pub.pem")
                fs.unlinkSync(rutaArchivo);
            });
        }else{
            res.status(400).send("ERROR: Llave previamente generada");
        }
    }catch(error: any){
        return res.status(500).json({
            code: error instanceof Exception ? error.code : 500,
            message: error.message || 'Error interno del servidor',
        });
    }
}

export const firmarArchivo = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  const { data, passphrase } = req.body;

  if (!file || !data || !passphrase) {
    res.status(400).json({ message: 'Faltan campos requeridos' });
    return;
  }
  try {
    const privateKeyPem = fs.readFileSync(file.path, 'utf-8');
    const firma = service.firmarServicio(data, privateKeyPem, passphrase);
    fs.unlinkSync(file.path);
    res.status(200).json({ firma });
  } catch (error: any) {
    if (file && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (err) {
        console.warn('No se pudo eliminar el archivo temporal:', err);
      }
    }
    res.status(500).json({
      code: error instanceof Exception ? error.code : 500,
      message: error.message || 'Error interno del servidor',
    });
  }
};

export const veriFirma = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, firma, curp } = req.body;
    if (!data || !firma || !curp) {
      res.status(400).json({ message: 'Faltan datos requeridos: data, firma o curp' });
      return;
    }

    const esValida = service.verificarFirma(data, firma, curp);

    res.status(200).json({ valid: esValida });
  } catch (error: any) {
    res.status(500).json({
      code: error instanceof Exception ? error.code : 500,
      message: error.message || 'Error interno del servidor',
    });
  }
};
