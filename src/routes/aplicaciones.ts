import { Router } from "express";
import { validateSchema } from '../middleware/validateSchema'
import * as controller from '../controllers/aplicaciones';
import * as schema from '../schemas/aplicaciones';

const router = Router();
router.get('/aplicaciones', controller.getAplicaciones);
router.get('/aplicaciones/:idAplicacion', controller.getAplicacion);
router.get('/aplicaciones/filtros', controller.filterAplicaciones);
router.post('/aplicaciones', validateSchema ( schema.insertAplicacion ), controller.insertAplicacion);
router.delete('/aplicaciones/:idAplicacion', controller.deleteAplicacion);
router.put('/aplicaciones/:idAplicacion', controller.updateAplicacion);

export default router;
