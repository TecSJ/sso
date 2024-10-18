import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.get('/', sesiones.getSesion );
router.delete('/:idSesion', sesiones.deleteSesion );

export default router;
