export default interface Aplicacion {
    idAplicacion: number;
    clave: string;
    nombre: string;
    redireccion: string;
    estado: 'Activo' | 'Inactivo';
}
