import { Router } from "express";
import * as aplicacionesController from '../controllers/aplicacionesController';

const router = Router();
router.get('/aplicaciones', aplicacionesController.getAplicaciones);
router.get('/aplicaciones/:idAplicacion', aplicacionesController.getAplicacion);
router.post('/aplicaciones', aplicacionesController.insertAplicacion);
router.delete('/aplicaciones/:idAplicacion', aplicacionesController.deleteAplicacion);
router.put('/aplicaciones/:idAplicacion', aplicacionesController.updateAplicacion);

export default router;
