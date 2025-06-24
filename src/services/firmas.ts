import crypto from 'crypto';

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
