import { Router } from "express";
import * as preferenciasController from '../controllers/preferenciasController';

const router = Router();
router.get('/preferencias', preferenciasController.getPreferencias);
router.get('/preferencias/:idPreferencia', preferenciasController.getPreferencia);
router.post('/preferencias', preferenciasController.insertPreferencia);
router.delete('/preferencias/:idPreferencia', preferenciasController.deletePreferencia);
router.put('/preferencias/:idPreferencia', preferenciasController.updatePreferencia);

export default router;