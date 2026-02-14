import express from 'express';
import { authMiddleware } from '../infrastructure/middleware/auth.js';
import createCaseLinkController from '../controllers/caseImage/create.js';
import getUserCaseLinksController from '../controllers/caseImage/getUserlinks.js';
import getCaseLinkController from '../controllers/caseImage/getByGuid.js';
import updateCaseLinkController from '../controllers/caseImage/update.js';
import deleteCaseImage from '../controllers/caseImage/delete.js';
import getPublic from '../controllers/caseImage/getPublicCaseImage.js';
import saveCaseLink from '../controllers/caseImage/saveCaseLink.js';    

const router = express.Router();

router.get('/public', getPublic);

router.use(authMiddleware);

router.post('/case-links', createCaseLinkController);
router.post('/save', saveCaseLink);
router.get('/case-links', getUserCaseLinksController);
router.delete('/case-links/delete/:guid', deleteCaseImage);
router.get('/case-links/:guid', getCaseLinkController);
router.put('/case-links/:guid', updateCaseLinkController);

export default router;