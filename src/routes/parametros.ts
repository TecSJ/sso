import { Router } from "express";
import * as parametros from '../controllers/parametros';
import Autenticacion from '../middleware/Autenticacion';

const router = Router();

router.get('/:idParametro', Autenticacion('Parametros','2') ,parametros.getParametro );
router.patch('/:idParametro', Autenticacion('Parametros','3'), parametros.updateParametro );
router.get('/', Autenticacion('Parametros','2') ,parametros.getParametros );

export default router;
