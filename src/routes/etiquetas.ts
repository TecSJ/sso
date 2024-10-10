import { Router } from "express";
import * as controller from '../controllers/etiquetas';

const router = Router();
router.get('/grupos/:idGrupo/etiquetas', controller.getEtiquetas);
router.get('/grupos/:idGrupo/etiquetas/:idEtiqueta', controller.getEtiqueta);
router.post('/grupos/:idGrupo/etiquetas', controller.insertEtiqueta);
router.delete('/grupos/:idGrupo/etiquetas/:idEtiquetas', controller.deleteEtiqueta);
router.put('/grupos/:idGrupo/etiquetas/:idEtiqueta', controller.updateEtiqueta);

export default router;
