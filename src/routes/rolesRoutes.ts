import { Router } from "express";
import * as rolesController from '../controllers/rolesController';

const router = Router();
router.get('/roles', rolesController.getRoles);
router.get('/roles/:idRol', rolesController.getRol);
router.post('/roles', rolesController.insertRol);
router.delete('/roles/:idRol', rolesController.deleteRol);
router.put('/roles/:idRol', rolesController.updateRol);

export default router;
