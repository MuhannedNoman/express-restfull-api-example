import { Router } from 'express';
import multer from 'multer';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import validateIdParam from '../../middleware/validateIdParam.js';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getUsers);

router.get('/:id', validateIdParam, getUserById);

router.post('/', upload.single('file'), createUser);

router.put('/:id', validateIdParam, updateUser);

router.delete('/:id', validateIdParam, deleteUser);

export default router;
