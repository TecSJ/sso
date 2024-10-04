import { Router } from "express";
import * as credencialesController from '../controllers/credencialesController';

const router = Router();
router.get('/credenciales', credencialesController.getAllCredenciales);
router.get('/credenciales/:idCredencial', credencialesController.getCredencialesById);

router.post('/credenciales', credencialesController.insertCredencial);
router.put('/credenciales/:idCredencial', credencialesController.updateCredencialesById);//usuario correo celular tipo
router.put('/credenciales/cambiarContrasena/:idCredencial', credencialesController.updateContrasena);//cambiar contraseña

router.delete('/credenciales/:idCredencial', credencialesController.deleteCredencialesById);

export default router;