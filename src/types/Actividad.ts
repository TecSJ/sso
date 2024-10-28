export default interface Actividad {
    idHistorial: number;
    creado: Date;
    idCredencial: string;
    idAplicacion: number;
    idModulo: number;
    accion: number;
    recurso: string;
    tipo: 'Success' | 'Fail';
  }
  