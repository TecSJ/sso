import { Router } from "express";
import * as controller from '../controllers/accesos';

const router = Router();
router.get('/accesos', controller.getAccesos);
router.get('/accesos/:idAcceso', controller.getAcceso);
router.post('/accesos', controller.insertAcceso);
router.delete('/accesos/:idAcceso', controller.deleteAcceso);
router.put('/accesos/:idAcceso', controller.updateAcceso);

export default router;