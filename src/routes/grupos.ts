import e, { Router } from "express";
import * as grupos from '../controllers/grupos';
import * as etiquetas from '../controllers/etiquetas';
import * as miembros from '../controllers/miembros';

const router = Router();

router.get('/etiquetas/:idEtiqueta', etiquetas.getEtiqueta );
router.put('/etiquetas/:idEtiqueta', etiquetas.updateEtiqueta );
router.delete('/etiquetas/:idEtiqueta', etiquetas.deleteEtiqueta);
router.get('/:idGrupo/etiquetas', etiquetas.getEtiquetas);
router.post('/:idGrupo/etiquetas', etiquetas.insertEtiqueta);
router.get('/etiquetas', etiquetas.getEtiquetas);

router.get('/miembros/:idMiembro', miembros.getMiembro );
router.put('/miembros/:idMiembro', miembros.updateMiembro );
router.delete('/miembros/:idMiembro', miembros.deleteMiembro );
router.get('/:idGrupo/miembros', miembros.getMiembros );
router.post('/:idGrupo/miembros', miembros.insertMiembro );
router.get('/miembros', miembros.getMiembros );

// Rutas de grupos (ordenadas de más específica a más genérica)
router.get('/:idGrupo', grupos.getGrupo);
router.put('/:idGrupo', grupos.updateGrupo);
router.delete('/:idGrupo', grupos.deleteGrupo);

router.get('/', grupos.getGrupos);
router.post('/', grupos.insertGrupo);
export default router;
