import { Router } from "express";
import * as controller from '../controllers/preferencias';

const router = Router();
router.get('/preferencias', controller.getPreferencias);
router.get('/preferencias/:idPreferencia', controller.getPreferencia);
router.post('/preferencias', controller.insertPreferencia);
router.delete('/preferencias/:idPreferencia', controller.deletePreferencia);
router.put('/preferencias/:idPreferencia', controller.updatePreferencia);

export default router;