import { Router } from "express";
import * as roles from '../controllers/roles';

const router = Router();
router.get('/', roles.getRoles );
router.get('/:idRol', roles.getRol );
router.post('/', roles.insertRol );
router.delete('/:idRol', roles.deleteRol );
router.put('/:idRol', roles.updateRol );

export default router;
