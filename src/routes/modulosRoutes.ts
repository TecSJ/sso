import { Router } from "express";
import * as modulosController from '../controllers/modulosController';

const router = Router();
router.get('/modulos', modulosController.getAllModulos);
router.get('/modulos/:idModulo', modulosController.getModulosById);

router.post('/modulos', modulosController.insertModulo);
router.put('/modulos/:idModulo', modulosController.updateModulosById);
router.delete('/modulos/:idModulo', modulosController.deleteModulosById);

export default router;