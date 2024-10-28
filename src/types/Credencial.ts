export default interface Credencial {
    idCredencial: string;
    curp: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string; // Formato de fecha como 'YYYY-MM-DD'
    estadoNacimiento: string;
    correo: string;
    celular: string; // Número de celular en formato internacional, hasta 13 caracteres
    contrasena: string; // Hash de contraseña de hasta 64 caracteres
    tipo: 'JWT' | 'OIDC' | 'OAuth 2.0';
    estado: 'Activo' | 'Validado' | 'Inactivo';
  }
  