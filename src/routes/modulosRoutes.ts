import { Router } from "express";
import * as modulosController from '../controllers/modulosController';

const router = Router();
router.get('/modulos', modulosController.getModulos);
router.get('/modulos/:idModulo', modulosController.getModulo);

router.post('/modulos', modulosController.insertModulo);
router.put('/modulos/:idModulo', modulosController.updateModulo);
router.delete('/modulos/:idModulo', modulosController.deleteModulo);

export default router;
