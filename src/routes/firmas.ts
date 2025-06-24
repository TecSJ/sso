import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as firmas from '../controllers/firmas';

const upload = multer({
  dest: path.join(__dirname, '..', 'tmp'), 
  limits: { fileSize: 2 * 1024 * 1024 },   
});

const router = Router();

router.get('/crear/', firmas.crearFirma)
router.post(
  '/firmar',
  upload.single('privateKey'),
  (req, res, next) => {
    Promise.resolve(firmas.firmarArchivoController(req, res))
      .catch(next);
  }
);

export default router;
