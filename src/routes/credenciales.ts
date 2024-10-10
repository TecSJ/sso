import { Router } from "express";
import * as controller from '../controllers/credenciales';

const router = Router();
router.get('/credenciales', controller.getCredenciales);
router.get('/credenciales/:idCredencial', controller.getCredencial);
router.post('/credenciales', controller.insertCredencial);
router.put('/credenciales/:idCredencial', controller.updateCredencial);
router.put('/credenciales/:idCredencial/cambiarContrasena', controller.setPassword);
router.delete('/credenciales/:idCredencial', controller.deleteCredencial);

export default router;