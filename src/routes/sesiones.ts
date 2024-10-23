import { Router } from "express";
import * as sesiones from '../controllers/sesiones';

const router = Router();

router.post('/', sesiones.getSesion );

export default router;
