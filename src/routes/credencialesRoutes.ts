import { Router } from "express";
import * as credencialesController from '../controllers/credencialesController';

const router = Router();
router.get('/credenciales', credencialesController.getCredenciales);
router.get('/credenciales/:idCredencial', credencialesController.getCredencial);
router.post('/credenciales', credencialesController.insertCredencial);
router.put('/credenciales/:idCredencial', credencialesController.updateCredencial);
router.put('/credenciales/:idCredencial/cambiarContrasena', credencialesController.setPassword);
router.delete('/credenciales/:idCredencial', credencialesController.deleteCredencial);

export default router;