import { Router } from "express";
import * as accesosController from '../controllers/accesosController';

const router = Router();
router.get('/accesos', accesosController.getAccesos);
router.get('/accesos/:idAcceso', accesosController.getAcceso);
router.post('/accesos', accesosController.insertAcceso);
router.delete('/accesos/:idAcceso', accesosController.deleteAcceso);
router.put('/accesos/:idAcceso', accesosController.updateAcceso);

export default router;