import { Router } from "express";
import * as modulosController from '../controllers/modulosController';

const router = Router();
router.get('/modulos', modulosController.getAllModulos);

export default router;