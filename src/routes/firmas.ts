import e, { Router } from "express";
import * as firmas from "../controllers/firmas"

const router = Router();

router.get('/crear/:data/:passphrase', firmas.crearFirma)

export default router;
