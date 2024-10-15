import { Router } from "express";
import * as parametros from '../controllers/parametros';

const router = Router();

router.get('/:idParametro',parametros.getParametro );
router.put('/:idParametro', parametros.updateParametro );
router.get('/', parametros.getParametros );

export default router;
