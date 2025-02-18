import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

const serviceAccountKeyPath = path.join(__dirname, './service-account-key.json');
const credentials = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf-8'));

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/admin.directory.user'],
  subject: 'sistemas@tecmm.edu.mx',
});

const directory = google.admin({ version: 'directory_v1', auth });

export const validarUsuario = async (correo: string): Promise<boolean> => {
  try {
    const response = await directory.users.get({ userKey: correo });
    if (!response.data) {
      return false;
    }
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    console.error('Error al verificar usuario:', error);
    throw error;
  }
};

export const estadoSuspension = async (correo: string, suspender: boolean): Promise<boolean> => {
  try {
    const response = await directory.users.update({
      userKey: correo,
      requestBody: {
        suspended: suspender,
      },
    });

    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Usuario ${correo} no encontrado.`);
      return false;
    }
    console.error(`Error al cambiar estado de suspensión para ${correo}:`, error);
    throw error;
  }
};
