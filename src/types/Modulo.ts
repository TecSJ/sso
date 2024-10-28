export default interface Modulo {
    idModulo: number;
    idAplicacion: number;
    clave: string;
    nombre: string;
    estado: 'Activo' | 'Inactivo';
  }
  