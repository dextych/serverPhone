import express from 'express';
import { uploadSingle } from '../../config/multer.js';
import uploadController from '../controllers/image/upload.js';
import { authMiddleware } from '../infrastructure/middleware/auth.js';

const router = express.Router();

router.post(
  '/upload',
  authMiddleware,
  uploadSingle, 
  uploadController
);


export default router;