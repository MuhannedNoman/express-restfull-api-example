import express from 'express';

import routes from './routers/index.js';
import logger from '../middleware/logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

routes(app);

export default app;
