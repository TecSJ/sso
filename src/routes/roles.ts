import { Router } from "express";
import * as roles from '../controllers/roles';
import * as accesos from '../controllers/accesos';
import * as perfiles from '../controllers/perfiles';
const router = Router();

// Rutas de accesos (más específicas primero)
router.get('/:idRol/accesos', accesos.getAcceso);
router.put('/:idRol/accesos', accesos.updateAcceso);
router.delete('/:idRol/accesos', accesos.deleteAcceso);
router.post('/:idRol/accesos', accesos.insertAcceso);
router.get('/accesos', accesos.getAccesos);

// Rutas de perfiles (más específicas primero)
router.get('/:idRol/perfiles', perfiles.getPerfil);
router.delete('/:idRol/perfiles', perfiles.deletePerfil);
router.post('/:idRol/perfiles', perfiles.insertPerfil);
router.get('/perfiles', perfiles.getPerfiles);

// Rutas de roles (más específicas primero)
router.get('/:idRol', roles.getRol);
router.put('/:idRol', roles.updateRol);
router.delete('/:idRol', roles.deleteRol);
router.get('/', roles.getRoles);
router.post('/', roles.insertRol);

export default router;
