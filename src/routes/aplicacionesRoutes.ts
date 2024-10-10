import { Router } from "express";
import { getAplicaciones, getAplicacion, insertAplicacion, deleteAplicacion, updateAplicacion } from '../controllers/aplicacionesController';
import { validateSchema } from '../middleware/validateSchema'
import { insertSchema } from '../schema/aplicacioneSchema'

const router = Router();
router.get('/aplicaciones', getAplicaciones);
router.get('/aplicaciones/:idAplicacion', getAplicacion);
router.post('/aplicaciones', validateSchema ( insertSchema ), insertAplicacion);
router.delete('/aplicaciones/:idAplicacion', deleteAplicacion);
router.put('/aplicaciones/:idAplicacion', updateAplicacion);

export default router;
