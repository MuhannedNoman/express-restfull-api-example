import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    throw new Error('Internal Server error');
  } catch (error) {
    next(error);
  }
});

export default router;
