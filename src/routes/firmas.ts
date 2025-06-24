import e, { Router } from "express";
import * as firmas from "../controllers/firmas"

const router = Router();

router.post('/crear/', firmas.crearFirma)

export default router;
