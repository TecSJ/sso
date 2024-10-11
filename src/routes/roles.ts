import { Router } from "express";
import * as controller from '../controllers/roles';

const router = Router();
router.get('/roles', controller.getRoles);
router.get('/roles/:idRol', controller.getRol);
router.get('/roles/filtros', controller.filterRoles);
router.post('/roles', controller.insertRol);
router.delete('/roles/:idRol', controller.deleteRol);
router.put('/roles/:idRol', controller.updateRol);

export default router;
