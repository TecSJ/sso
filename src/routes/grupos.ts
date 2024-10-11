import { Router } from "express";
import * as controller from '../controllers/grupos';

const router = Router();
router.get('/grupos', controller.getGrupos);
router.get('/grupos/:idGrupo', controller.getGrupo);
router.get('/grupos/filtros', controller.filterGrupos);
router.post('/grupos', controller.insertGrupo);
router.delete('/grupos/:idGrupo', controller.deleteGrupo);
router.put('/grupos/:idGrupo', controller.updateGrupo);

export default router;
