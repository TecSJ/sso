import { Router } from "express";
import * as credenciales from '../controllers/credenciales';
import * as codigos from '../controllers/codigos';
import * as preferencias from '../controllers/preferencias';

const router = Router();

router.get('/codigos/:idCodigo', codigos.getCodigo );
router.get('/:idCredencial/codigos', codigos.getCodigos );
router.post('/:idCredencial/codigos', codigos.insertCodigo );
router.get('/codigos', codigos.getCodigos );

router.get('/:idCredencial/preferencias', preferencias.getPreferencia );
router.put('/:idCredencial/preferencias', preferencias.updatePreferencia );

router.get('/:idCredencial', credenciales.getCredencial );
router.put('/:idCredencial', credenciales.updateCredencial );
router.delete('/:idCredencial', credenciales.deleteCredencial );
router.get('/', credenciales.getCredenciales );
router.post('/', credenciales.insertCredencial );

export default router;