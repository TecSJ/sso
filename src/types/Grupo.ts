export default interface Grupo {
    idGrupo: number;
    clave: string;
    nombre: string;
    estado: 'Activo' | 'Inactivo' | 'Eliminado';
  }
  