import { Router } from "express";
import * as roles from '../controllers/roles';
import * as accesos from '../controllers/accesos';

const router = Router();


router.get('/:idRol/accesos', accesos.getAcceso);
router.put('/:idRol/accesos', accesos.updateAcceso );
router.delete('/:idRol/accesos', accesos.deleteAcceso );
router.post('/:idRol/accesos', accesos.insertAcceso );
router.get('/accesos', accesos.getAccesos);

router.get('/', roles.getRoles );
router.get('/:idRol', roles.getRol );
router.post('/', roles.insertRol );
router.delete('/:idRol', roles.deleteRol );
router.put('/:idRol', roles.updateRol );

export default router;
