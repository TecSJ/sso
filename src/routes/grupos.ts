import e, { Router } from "express";
import * as grupos from '../controllers/grupos';
import * as etiquetas from '../controllers/etiquetas';
import * as miembros from '../controllers/miembros';
import Autenticacion from '../middleware/Autenticacion';

const router = Router();

router.get('/etiquetas/:idEtiqueta', Autenticacion('Etiquetas','2') ,etiquetas.getEtiqueta );
router.put('/etiquetas/:idEtiqueta', Autenticacion('Etiquetas','3') , etiquetas.updateEtiqueta );
router.delete('/etiquetas/:idEtiqueta', Autenticacion('Etiquetas','4') ,etiquetas.deleteEtiqueta);
router.get('/:idGrupo/etiquetas', Autenticacion('Etiquetas','2') ,etiquetas.getEtiquetas);
router.post('/:idGrupo/etiquetas',Autenticacion('Etiquetas','1'), etiquetas.insertEtiqueta);
router.get('/etiquetas',Autenticacion('Etiquetas','2'), etiquetas.getEtiquetas);

router.get('/miembros/:idMiembro', Autenticacion('Miembros','2'), miembros.getMiembro );
router.put('/miembros/:idMiembro', Autenticacion('Miembros','3'), miembros.updateMiembro );
router.delete('/miembros/:idMiembro', Autenticacion('Miembros','4'), miembros.deleteMiembro );
router.get('/:idGrupo/miembros', Autenticacion('Miembros','2'), miembros.getMiembros );
router.post('/:idGrupo/miembros', Autenticacion('Miembros','1'), miembros.insertMiembro );
router.get('/miembros', Autenticacion('Miembros','2'), miembros.getMiembros );

// Rutas de grupos (ordenadas de más específica a más genérica)
router.get('/:idGrupo', Autenticacion('Grupos','2'), grupos.getGrupo);
router.put('/:idGrupo', Autenticacion('Grupos','3'), grupos.updateGrupo);
router.delete('/:idGrupo', Autenticacion('Grupos','4'), grupos.deleteGrupo);

router.get('/', Autenticacion('Grupos','2'), grupos.getGrupos);
router.post('/', Autenticacion('Grupos','1'), grupos.insertGrupo);
export default router;
