import e, { Router } from "express";
import * as grupos from '../controllers/grupos';
import * as etiquetas from '../controllers/etiquetas';

const router = Router();

router.get('/:idGrupo/etiquetas/:idEtiqueta', etiquetas.getEtiqueta);
router.put('/:idGrupo/etiquetas/:idEtiqueta', etiquetas.updateEtiqueta);
router.delete('/:idGrupo/etiquetas/:idEtiqueta', etiquetas.deleteEtiqueta);

router.get('/:idGrupo/etiquetas', etiquetas.getEtiquetas);
router.post('/:idGrupo/etiquetas', etiquetas.insertEtiqueta);

router.get('/etiquetas', etiquetas.getEtiquetas);

// Rutas de grupos (ordenadas de más específica a más genérica)
router.get('/:idGrupo', grupos.getGrupo);
router.put('/:idGrupo', grupos.updateGrupo);
router.delete('/:idGrupo', grupos.deleteGrupo);

router.get('/', grupos.getGrupos);
router.post('/', grupos.insertGrupo);
export default router;
