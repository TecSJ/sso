import { Router } from "express";
import * as etiquetasController from '../controllers/etiquetasController';

const router = Router();
router.get('/grupos/:idGrupo/etiquetas', etiquetasController.getEtiquetas);
router.get('/grupos/:idGrupo/etiquetas/:idEtiqueta', etiquetasController.getEtiqueta);
router.post('/grupos/:idGrupo/etiquetas', etiquetasController.insertEtiqueta);
router.delete('/grupos/:idGrupo/etiquetas/:idEtiquetas', etiquetasController.deleteEtiqueta);
router.put('/grupos/:idGrupo/etiquetas/:idEtiqueta', etiquetasController.updateEtiqueta);

export default router;
