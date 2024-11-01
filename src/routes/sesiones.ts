import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.post('/', sesiones.getSesion );
router.delete('/', sesiones.deleteSesion );
router.get('/is-valid', sesiones.getValidacion );
router.put('/:idCredencial/set-contrasena', sesiones.setPassword );

export default router;
