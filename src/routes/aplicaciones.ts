import { Router } from "express";
import * as aplicaciones from '../controllers/aplicaciones';
import * as modulos from '../controllers/modulos';
import Autenticacion from '../middleware/Autenticacion';

const router = Router();

// Rutas relacionadas con módulos (más específicas)
router.get('/modulos/:idModulo', Autenticacion('Modulos','2'), modulos.getModulo);
router.put('/modulos/:idModulo', Autenticacion('Modulos','3'), modulos.updateModulo);
router.delete('/modulos/:idModulo', Autenticacion('Modulos','4'), modulos.deleteModulo);
router.get('/:idAplicacion/modulos', Autenticacion('Modulos','2'), modulos.getModulos);
router.post('/:idAplicacion/modulos', Autenticacion('Modulos','1'), modulos.insertModulo);
router.get('/modulos',Autenticacion('Modulos','2'), modulos.getModulos);

// Rutas relacionadas con aplicaciones (más generales)
router.get('/:idAplicacion',Autenticacion('Aplicaciones','2'), aplicaciones.getAplicacion);
router.put('/:idAplicacion',Autenticacion('Aplicaciones','3'), aplicaciones.updateAplicacion);
router.delete('/:idAplicacion',Autenticacion('Aplicaciones','4'), aplicaciones.deleteAplicacion);

router.get('/',Autenticacion('Aplicaciones','2'), aplicaciones.getAplicaciones);
router.post('/',Autenticacion('Aplicaciones','1'), aplicaciones.insertAplicacion);
export default router;
