import express from 'express';
import { PrismaClient } from '@prisma/client';

import routes from './routers/index.js';
import logger from '../middleware/logger.js';
import errorHandler from '../middleware/errorHandler.js';

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
  });
  next();
});

routes(app);

app.use(errorHandler);

export default app;
