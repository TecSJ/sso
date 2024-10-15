import { Router } from "express";
import * as aplicaciones from '../controllers/aplicaciones';
import * as modulos from '../controllers/modulos';

const router = Router();

// Rutas relacionadas con módulos (más específicas)
router.get('/modulos/:idModulo', modulos.getModulo);
router.put('/modulos/:idModulo', modulos.updateModulo);
router.delete('/modulos/:idModulo', modulos.deleteModulo);
router.get('/:idAplicacion/modulos', modulos.getModulos);
router.post('/:idAplicacion/modulos', modulos.insertModulo);
router.get('/modulos', modulos.getModulos);

// Rutas relacionadas con aplicaciones (más generales)
router.get('/:idAplicacion', aplicaciones.getAplicacion);
router.put('/:idAplicacion', aplicaciones.updateAplicacion);
router.delete('/:idAplicacion', aplicaciones.deleteAplicacion);

router.get('/', aplicaciones.getAplicaciones);
router.post('/', aplicaciones.insertAplicacion);
export default router;
