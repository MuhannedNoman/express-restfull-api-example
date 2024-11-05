import { Router } from 'express';
import { join } from 'node:path';

import { __dirname } from '../app.js';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

export default router;
