import { Router } from "express";
import * as controller from '../controllers/preferencias';

const router = Router();
router.get('/', controller.getPreferencias);
router.get('/:idPreferencia', controller.getPreferencia);
router.get('/filtros', controller.filterPreferencias);
router.post('/', controller.insertPreferencia);
router.delete('/:idPreferencia', controller.deletePreferencia);
router.put('/:idPreferencia', controller.updatePreferencia);

export default router;