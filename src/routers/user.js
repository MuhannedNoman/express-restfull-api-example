import { Router } from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit'

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import validateIdParam from '../../middleware/validateIdParam.js';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getUsers);

router.get('/:id', validateIdParam, getUserById);

router.post('/', limiter, upload.single('file'), createUser);

router.put('/:id', validateIdParam, updateUser);

router.delete('/:id', validateIdParam, deleteUser);

export default router;
