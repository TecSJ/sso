import { generateKeyPairSync } from 'crypto';
import fs from 'fs';

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