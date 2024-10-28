export default interface Acceso {
    idAcceso: number;
    idRol: number;
    idModulo: number;
    accion1: boolean; // Crear
    accion2: boolean; // Consultar
    accion3: boolean; // Actualizar
    accion4: boolean; // Eliminar
    accion5: boolean; // Subir
  }
  