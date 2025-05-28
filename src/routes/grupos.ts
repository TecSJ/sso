import e, { Router } from "express";
import * as grupos from '../controllers/grupos';
import * as miembros from '../controllers/miembros';
import Autenticacion from '../middleware/Autenticacion';

const router = Router();

router.get('/miembros/:idMiembro', miembros.getMiembro );
router.delete('/miembros/:idMiembro', Autenticacion('Grupos','4'), miembros.deleteMiembro );
router.get('/:idGrupo/miembros', miembros.getMiembros );
router.patch('/:idCredencial/miembros', Autenticacion('Credenciales','1'), miembros.insertMiembro );
router.get('/miembros', miembros.getMiembros );

// Rutas de grupos (ordenadas de más específica a más genérica)
router.get('/descargar', grupos.getDescarga);
router.get('/:idGrupo', grupos.getGrupo);
router.patch('/:idGrupo', Autenticacion('Grupos','3'), grupos.updateGrupo);
router.delete('/:idGrupo', Autenticacion('Grupos','4'), grupos.deleteGrupos );

router.get('/:idCredencial/select', Autenticacion('Roles','2'), grupos.getGrupselec);
router.get('/', grupos.getGrupos);
router.post('/', Autenticacion('Grupos','1'), grupos.insertGrupo);
export default router;
