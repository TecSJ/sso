import { Request, Response } from 'express';
import fs from 'fs';
import { firmarServicio as firmar } from '../services/firmas';
import { Exception } from '../model/Exception';

export const firmarArchivoController = async (req: Request, res: Response) => {
  try {
    const file = req.file; 
    const { data, passphrase } = req.body;

    if (!file || !data || !passphrase) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const privateKeyPem = fs.readFileSync(file.path, 'utf-8');
    const firma = firmar(data, privateKeyPem, passphrase);


    fs.unlinkSync(file.path);

    return res.status(200).json({ firma });
  } catch (error: any) {
    return res.status(500).json({
      code: error instanceof Exception ? error.code : 500,
      message: error.message || 'Error interno del servidor',
    });
  }
};
