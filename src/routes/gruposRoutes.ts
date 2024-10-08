import { Router } from "express";
import * as gruposController from '../controllers/gruposController';

const router = Router();
router.get('/grupos', gruposController.getGrupos);
router.get('/grupos/:idGrupo', gruposController.getGrupo);
router.post('/grupos', gruposController.insertGrupo);
router.delete('/grupos/:idGrupo', gruposController.deleteGrupo);
router.put('/grupos/:idGrupo', gruposController.updateGrupo);

export default router;
