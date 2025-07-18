import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import { ssoDB } from '../model/Connection';
import { RowDataPacket } from 'mysql2';
import { queries } from '../queries/llaves';
import crypto from 'crypto';
import path from 'path';

interface validacion{
    val: number
}

export const generarLlave = async (passphrase: string, name: string, uid:string): Promise<string> => {

    const { publicKey, privateKey } =  generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: passphrase
        },
    });
    //crear directorio
    fs.mkdirSync(process.env.LLAVES_DIR+uid, { recursive: true });


    // Guardar las llaves en archivos .pem
    fs.writeFileSync(process.env.LLAVES_DIR+uid+"/"+name+'_pub.pem', publicKey);
    fs.writeFileSync(process.env.LLAVES_DIR+uid+"/"+name+'.pem', privateKey);

    console.log('Llaves generadas y guardadas correctamente!');

    return process.env.LLAVES_DIR+uid+"/"+name+'.pem';

}

export const registrarLlave = async (idCredencial: string, curp: string, ubicacion: string) => {
    await ssoDB.query<RowDataPacket[]>(queries.insertLlave, [idCredencial, curp, ubicacion]);
    //return  rows[0][0] as Llaves  || undefined;
}

export const validarLlave = async (curp:string) => {
    const [rows] = await ssoDB.query<RowDataPacket[]>(queries.validarLlave, [curp]);
    const validacion = rows as validacion[];
    if(validacion[0].val > 0){
        return false;
    }else{
        return true;
    }
}

export const firmarServicio = (
  data: string,
  privateKeyPem: string,
  passphrase: string
): string => {
  const signer = crypto.createSign('SHA256');
  signer.update(data);
  signer.end();

  const keyObject = { key: privateKeyPem, passphrase };
  return signer.sign(keyObject, 'base64');
};
export const verificarFirma = (
  data: string,
  firma: string,
  curp: string
): boolean => {
  const esValida = validarLlave(curp);
  if (!esValida) {
    throw new Error('Llave no válida');
  }
  const rutaLlave = path.join(process.env.LLAVES_DIR || '', curp, 'llave_pub.pem');
  if (!fs.existsSync(rutaLlave)) {
    throw new Error(`No se encontró la llave pública para el CURP: ${curp}`);
  }
  const publicKeyPem = fs.readFileSync(rutaLlave, 'utf-8');
  const verifier = crypto.createVerify('SHA256');
  verifier.update(data);
  verifier.end();
  return verifier.verify(publicKeyPem, firma, 'base64');
};