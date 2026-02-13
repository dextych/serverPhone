import express from 'express';
import getCaseController from '../controllers/case/getCase.js';

const router = express.Router();

router.get('/case', getCaseController);

export default router;