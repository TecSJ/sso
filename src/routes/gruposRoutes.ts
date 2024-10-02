import { Router } from "express";
import * as gruposController from '../controllers/gruposController';

const router = Router();
router.get('/grupos', gruposController.getAllGrupos);
router.get('/grupos/:idGrupo', gruposController.getGrupoById);
router.post('/grupos', gruposController.insertGrupo);
router.delete('/grupos/:idGrupo', gruposController.deleteOneGrupo);
router.put('/grupos/:idGrupo', gruposController.updateGrupo);

export default router;