import { Router } from "express";
import * as aplicacionesController from '../controllers/aplicacionesController';

const router = Router();
router.get('/aplicaciones', aplicacionesController.getAllAplicaciones);
router.get('/aplicaciones/:idAplicacion', aplicacionesController.getAplicacionById);
router.post('/aplicaciones', aplicacionesController.insertAplicacion);
router.delete('/aplicaciones/:idAplicacion', aplicacionesController.deleteAplicacionById);
router.put('/aplicaciones/:idAplicacion', aplicacionesController.updateAplicacionById);

export default router;
