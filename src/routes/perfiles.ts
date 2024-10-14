import { Router } from "express";
import * as controller from '../controllers/perfiles';

const router = Router();
router.get('/', controller.getPerfiles);
router.get('/:idPerfil', controller.getPerfil);
router.get('/filtros', controller.filterPerfil);
router.post('/', controller.insertPerfil);
router.put('/:idPerfil', controller.updatePerfil);
router.delete('/:idPerfil', controller.deletePerfil);

export default router;
