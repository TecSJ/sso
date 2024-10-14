import { Router } from "express";
import * as controller from '../controllers/codigos';

const router = Router();
router.get('/codigos', controller.getCodigos);
router.get('/codigos/:idCodigo', controller.getCodigo);
router.get('/codigos/filtros', controller.filterCodigos);
router.post('/codigos', controller.insertCodigo );
router.delete('/codigos/:idCodigo', controller.deleteCodigo );
router.put('/codigos/:idCodigo', controller.updateCodigo );

export default router;
