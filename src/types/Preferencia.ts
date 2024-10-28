export default interface Preferencia {
    idPreferencia: number;
    idCredencial: string;
    dobleFactor: 'S' | 'N';
    cambiarContrasena: 'S' | 'N';
  }
  