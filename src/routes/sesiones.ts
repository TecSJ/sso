import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.post('/', sesiones.getSesion );
router.delete('/', sesiones.deleteSesion );
router.delete('/', sesiones.deleteSesion );
router.put('/:idCredencial/set-contrasena', sesiones.setPassword );

export default router;
