import express from 'express';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import routes from './routers/index.js';
import logger from '../middleware/logger.js';
import errorHandler from '../middleware/errorHandler.js';

export const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _, next) => {
  logger.info({
    message: `${req.method} ${req.url}`,
    stack: req.url,
    params: req.params,
    body: req.body,
    filePath: req.file ? req.file.path : null,
  });
  next();
});

routes(app);

app.use(errorHandler);

export default app;
