import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.post('/', sesiones.getSesion );
router.post('/google', sesiones.getGoogle );
router.delete('/:idCredencial', sesiones.deleteSesion );
router.post('/is-valid', sesiones.getValidacion );
router.post('/is-auth', sesiones.getAuntenticacion );
router.patch('/:idCredencial/set-contrasena', sesiones.setPassword );
router.get('/:idCredencial/data', sesiones.getData);
router.post('/mail', sesiones.mail);

export default router;
