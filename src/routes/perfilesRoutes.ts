import { Router } from "express";
import * as perfilesController from '../controllers/perfilesController';

const router = Router();
router.get('/perfiles', perfilesController.getAllPerfiles);
router.get('/perfiles/:idPerfil', perfilesController.getPerfilesById);

router.post('/perfiles', perfilesController.insertPerfil);
router.put('/perfiles/:idPerfil', perfilesController.updatePerfilesById);
router.delete('/perfiles/:idPerfil', perfilesController.deletePerfilesById);

export default router;