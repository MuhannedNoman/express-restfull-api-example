import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import validateIdParam from '../../middleware/validateIdParam.js';

const router = Router();

router.get('/', getUsers);

router.get('/:id', validateIdParam, getUserById);

router.post('/', createUser);

router.put('/:id', validateIdParam, updateUser);

router.delete('/:id', validateIdParam, deleteUser);

export default router;
