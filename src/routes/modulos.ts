import { Router } from "express";
import * as controller from '../controllers/modulos';

const router = Router();
router.get('/modulos', controller.getModulos);
router.get('/modulos/:idModulo', controller.getModulo);
router.get('/modulos/filtros', controller.filterModulos);
router.post('/modulos', controller.insertModulo);
router.put('/modulos/:idModulo', controller.updateModulo);
router.delete('/modulos/:idModulo', controller.deleteModulo);

export default router;
