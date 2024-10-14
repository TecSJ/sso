import { Router } from "express";
import * as controller from '../controllers/credenciales';
import { validateSchema } from "../middleware/validateSchema";
import * as schema from '../model/Schema';

const router = Router();
router.get('/', controller.getCredenciales);
router.get('/filtros', controller.filterCredenciales );
router.get('/:idCredencial', controller.getCredencial );
router.get('/:idCredencial/codigo', controller.getCodigo );
router.post('/:idCredencial/codigo', controller.insertCodigo );
router.post('/', controller.insertCredencial);
router.put('/:idCredencial', validateSchema( schema.contrasenas ) ,controller.updateCredencial);
router.put('/:idCredencial/cambiarContrasena', controller.setPassword);
router.delete('/:idCredencial', controller.deleteCredencial);



export default router;