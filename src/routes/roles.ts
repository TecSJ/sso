import { Router } from "express";
import * as roles from '../controllers/roles';
import * as accesos from '../controllers/accesos';
import * as perfiles from '../controllers/perfiles';
import Autenticacion from '../middleware/Autenticacion';
const router = Router();

// Rutas de accesos (más específicas primero)
router.get('/:idRol/accesos', Autenticacion('Roles','2'), accesos.getAccesos);
router.patch('/:idRol/accesos', Autenticacion('Roles','3'), accesos.addAccesos);

// Rutas de perfiles (más específicas primero)
router.get('/:idCredencial/perfiles', Autenticacion('Credenciales','2'), perfiles.getPerfil);
router.delete('/:idRol/perfiles', Autenticacion('Roles','4'), perfiles.deletePerfil);
router.patch('/:idCredencial/perfiles', Autenticacion('Credenciales','1'), perfiles.upsertPerfil);
router.get('/perfiles', Autenticacion('Credenciales','2'), perfiles.getPerfiles);

// Rutas de roles (más específicas primero)
router.get('/descargar', roles.getDescarga);
router.get('/:idRol', Autenticacion('Roles','2'), roles.getRol);
router.patch('/:idRol', Autenticacion('Roles','3'),  roles.updateRol);
router.delete('/:idRol', Autenticacion('Roles','4'),  roles.deleteRol);
router.get('/:idCredencial/select', Autenticacion('Roles','2'), roles.getRolselec);
router.get('/', Autenticacion('Roles','2'), roles.getRoles);
router.post('/', Autenticacion('Roles','2'), roles.insertRol);

export default router;
