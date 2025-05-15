import { Router } from "express";
import * as credenciales from '../controllers/credenciales';
import * as codigos from '../controllers/codigos';
import * as preferencias from '../controllers/preferencias';
import * as historial from '../controllers/historial';
import * as etiquetas from '../controllers/etiquetas';
import * as asociacion from '../controllers/asociacion';
import Autenticacion from '../middleware/Autenticacion';

const router = Router();

router.get('/codigos/:idCodigo', Autenticacion('Credenciales','2'), codigos.getCodigo );
router.get('/:idCredencial/codigos', Autenticacion('Credenciales','2'), codigos.getCodigos );
router.post('/:idCredencial/codigos', codigos.insertCodigo );
router.get('/codigos', Autenticacion('Credenciales','2'), codigos.getCodigos );
router.post('/:idCredencial/codigos/:codigo', codigos.validarCodigo );
router.delete('/:idCredencial/codigos', codigos.deleteCodigo );

router.get('/:idCredencial/preferencias',Autenticacion('Credenciales','2'), preferencias.getPreferencia );
router.patch('/:idCredencial/preferencias', Autenticacion('Credenciales','3'), preferencias.updatePreferencia );

router.get('/:idCredencial/historial', Autenticacion('Credenciales','2'), historial.getHistorial );
router.get('/bitacora', Autenticacion('Credenciales','2'), historial.getBitacora );
router.post('/:idCredencial/historial', Autenticacion('Credenciales','1'), historial.insertHistorial );

router.get('/descargar', Autenticacion('Grupos', '2'), credenciales.getDescarga);
router.get('/etiquetas',Autenticacion('Credenciales','2'), etiquetas.getEtiquetas);
router.get('/:idCredencial', Autenticacion('Credenciales','2'), credenciales.getCredencial );
router.patch('/:idCredencial', Autenticacion('Credenciales','3'), credenciales.updateCredencial );
router.delete('/:idCredencial', Autenticacion('Credenciales','4'), credenciales.deleteCredencial );
router.get('/', Autenticacion('Credenciales','2'), credenciales.getCredenciales );
router.post('/', credenciales.insertCredencial );

router.get('/workspace/dominios', Autenticacion('Credenciales','2'), credenciales.getDominios );
router.patch('/workspace/:idCredencial/status', Autenticacion('Credenciales','2'), credenciales.statusWorkspace );

router.get('/etiquetas/:idEtiqueta', Autenticacion('Credenciales','2') ,etiquetas.getEtiqueta );
router.patch('/:idCredencial/etiquetas', Autenticacion('Credenciales','4') ,asociacion.upsertAsociacion);
router.get('/:idCredencial/etiquetas', Autenticacion('Credenciales','2') ,asociacion.getAsociacion);

export default router;
