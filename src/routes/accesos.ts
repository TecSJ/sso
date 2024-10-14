import { Router } from "express";
import * as controller from '../controllers/accesos';

const router = Router();
router.get('/', controller.getAccesos);
router.get('/:idAcceso', controller.getAcceso);
router.get('/filtros', controller.filterAccesos);
router.post('/', controller.insertAcceso);
router.delete('/:idAcceso', controller.deleteAcceso);
router.put('/:idAcceso', controller.updateAcceso);

export default router;