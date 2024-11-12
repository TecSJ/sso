import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.post('/', sesiones.getSesion );
router.delete('/', sesiones.deleteSesion );
router.post('/is-valid', sesiones.getValidacion );
router.post('/is-auth', sesiones.getAuntenticacion );
router.patch('/:idCredencial/set-contrasena', sesiones.setPassword );

export default router;
