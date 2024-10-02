import { Router } from "express";
import * as rolesController from '../controllers/rolesController';

const router = Router();
router.get('/roles', rolesController.getAllRoles);
router.get('/roles/:idRol', rolesController.getRolById);
router.post('/roles', rolesController.insertRol);
router.delete('/roles/:idRol', rolesController.deleteRolById);
router.put('/roles/:idRol', rolesController.updateRolById);

export default router;