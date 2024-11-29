import { Router } from "express";
import * as roles from '../controllers/roles';
import * as accesos from '../controllers/accesos';
import * as perfiles from '../controllers/perfiles';
import Autenticacion from '../middleware/Autenticacion';
const router = Router();

// Rutas de accesos (más específicas primero)
router.get('/:idRol/accesos', Autenticacion('Accesos','2'), accesos.getAccesos);
router.patch('/:idRol/accesos', Autenticacion('Accesos','3'), accesos.addAccesos);

// Rutas de perfiles (más específicas primero)
router.get('/:idRol/perfiles', Autenticacion('Perfiles','2'), perfiles.getPerfil);
router.delete('/:idRol/perfiles', Autenticacion('Perfiles','4'), perfiles.deletePerfil);
router.patch('/:idCredencial/perfiles', Autenticacion('Perfiles','1'), perfiles.upsertPerfil);
router.get('/perfiles', Autenticacion('Perfiles','2'), perfiles.getPerfiles);

// Rutas de roles (más específicas primero)
router.get('/:idRol', Autenticacion('Roles','2'), roles.getRol);
router.patch('/:idRol', Autenticacion('Roles','3'),  roles.updateRol);
router.delete('/:idRol', Autenticacion('Roles','4'),  roles.deleteRol);
router.get('/', Autenticacion('Roles','2'), roles.getRoles);
router.post('/', Autenticacion('Roles','2'), roles.insertRol);

export default router;
