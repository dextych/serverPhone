import express from 'express';
import { authMiddleware } from '../infrastructure/middleware/auth.js';
import createCaseLinkController from '../controllers/caseImage/create.js';
import getUserCaseLinksController from '../controllers/caseImage/getUserlinks.js';
import getCaseLinkController from '../controllers/caseImage/getByGuid.js';
import updateCaseLinkController from '../controllers/caseImage/update.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/case-links', createCaseLinkController);
router.get('/case-links', getUserCaseLinksController);
router.get('/case-links/:guid', getCaseLinkController);
router.put('/case-links/:guid', updateCaseLinkController);

export default router;