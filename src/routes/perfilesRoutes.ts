import { Router } from "express";
import * as perfilesController from '../controllers/perfilesController';

const router = Router();
router.get('/perfiles', perfilesController.getPerfiles);
router.get('/perfiles/:idPerfil', perfilesController.getPerfil);

router.post('/perfiles', perfilesController.insertPerfil);
router.put('/perfiles/:idPerfil', perfilesController.updatePerfil);
router.delete('/perfiles/:idPerfil', perfilesController.deletePerfil);

export default router;
