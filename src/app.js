import express from 'express';
import { rateLimit } from 'express-rate-limit'
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

import routes from './routers/index.js';
import logger from '../middleware/logger.js';
import errorHandler from '../middleware/errorHandler.js';

export const __dirname = dirname(fileURLToPath(import.meta.url));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
});

const corsOptions = {
  origin: "*",
  headers: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
export const prisma = new PrismaClient();

app.use(cors(corsOptions));
app.use(limiter);
app.set('view engine', 'ejs')
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

app.set('views', path.join(__dirname, 'views'));

routes(app);

app.use(errorHandler);

export default app;
