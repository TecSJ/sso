import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

const serviceAccountKeyPath = path.join(__dirname, './service-account-key.json');
const credentials = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf-8'));

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/admin.directory.user',
           'https://www.googleapis.com/auth/admin.directory.domain.readonly'
  ],
  subject: process.env.ADMIN_EMAIL,
});

const directory = google.admin({ version: 'directory_v1', auth });

export const obtenerDominios = async () => {
  try {
    const response = await directory.domains.list({
      customer: 'my_customer',
    });
    return response.data.domains;
  } catch (error) {
    console.error('Error al obtener dominios:', error);
    throw error;
  }
};

export const dominioRegistrado = async (dominio: string): Promise<boolean>=> {
  try {
    const response = await directory.domains.list({
      customer: 'my_customer',
    });
    const dominioEncontrado = response.data.domains?.some(d => d.domainName === dominio);
    return dominioEncontrado || false;
  } catch (error) {
    console.error('Error al obtener dominios:', error);
    throw error;
  }
};

export const crearUsuario = async (correo: string, nombre: string, apellido: string,): Promise<boolean> => {
  try {
    console.log(`Creando usuario ${correo}...`);
    await directory.users.insert({
      requestBody: {
        primaryEmail: correo,
        name: {
          givenName: nombre,
          familyName: apellido,
        },
        password: process.env.DEFAULT_PASSWORD,
      },
    });
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      console.error(`Usuario ${correo} ya existe.`);
      return false;
    }
    console.error(`Error al crear usuario ${correo}:`, error);
    throw error;
  }
};

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
    await directory.users.update({
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
