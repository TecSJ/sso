import { Router } from "express";
import * as roles from '../controllers/roles';
import * as accesos from '../controllers/accesos';
import * as perfiles from '../controllers/perfiles';
import Autenticacion from '../middleware/Autenticacion';
const router = Router();

// Rutas de accesos (más específicas primero)
router.get('/:idRol/accesos', Autenticacion('Accesos','2'), accesos.getAcceso);
router.put('/:idRol/accesos', Autenticacion('Accesos','3'), accesos.updateAcceso);
router.delete('/:idRol/accesos', Autenticacion('Accesos','4'), accesos.deleteAcceso);
router.post('/:idRol/accesos', Autenticacion('Accesos','1'), accesos.insertAcceso);
router.get('/accesos', Autenticacion('Accesos','2'), accesos.getAccesos);

// Rutas de perfiles (más específicas primero)
router.get('/:idRol/perfiles', Autenticacion('Perfiles','2'), perfiles.getPerfil);
router.delete('/:idRol/perfiles', Autenticacion('Perfiles','4'), perfiles.deletePerfil);
router.post('/:idRol/perfiles', Autenticacion('Perfiles','1'), perfiles.insertPerfil);
router.get('/perfiles', Autenticacion('Perfiles','2'), perfiles.getPerfiles);

// Rutas de roles (más específicas primero)
router.get('/:idRol', Autenticacion('Roles','2'), roles.getRol);
router.put('/:idRol', Autenticacion('Roles','3'),  roles.updateRol);
router.delete('/:idRol', Autenticacion('Roles','4'),  roles.deleteRol);
router.get('/', Autenticacion('Roles','2'), roles.getRoles);
router.post('/', Autenticacion('Roles','2'), roles.insertRol);

export default router;
