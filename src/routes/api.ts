import { Router, Request, Response } from "express";
import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping);

router.get('/randon', ApiController.randon)

router.get('/name/:nomeRecebido', ApiController.name)

router.post('/frases', ApiController.createPhrases);
router.get('/frases', ApiController.getPhrases);
router.get('/frase', ApiController.getSpecificPhrase);
router.put('/fraseAlterada', ApiController.changePhrase);
router.delete('/fraseDeletada/:id', ApiController.deletePhrase);

router.get('/frase/aleatoria', ApiController.randomPhrase);

export default router;