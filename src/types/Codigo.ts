export default interface Codigo {
    idCodigo: number;
    idCredencial: string;
    clave: string;
    tipo: 'Validación' | 'Autenticación' | 'Recuperación';
    medio: 'Correo' | 'Celular';
    caducidad: number;
    estado: 'Sin confirmación' | 'Confirmado';
  }
  