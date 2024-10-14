import { Router } from "express";
import * as controller from '../controllers/roles';

const router = Router();
router.get('/', controller.getRoles);
router.get('/:idRol', controller.getRol);
router.get('/filtros', controller.filterRoles);
router.post('/', controller.insertRol);
router.delete('/:idRol', controller.deleteRol);
router.put('/:idRol', controller.updateRol);

export default router;
