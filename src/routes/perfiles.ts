import { Router } from "express";
import * as controller from '../controllers/perfiles';

const router = Router();
router.get('/perfiles', controller.getPerfiles);
router.get('/perfiles/:idPerfil', controller.getPerfil);

router.post('/perfiles', controller.insertPerfil);
router.put('/perfiles/:idPerfil', controller.updatePerfil);
router.delete('/perfiles/:idPerfil', controller.deletePerfil);

export default router;
