import user from './user.js';
import products from './products.js';
import error from './error.js';
import htmlFiles from './static.js';

export default (app) => {
  app.use('/api/users', user);
  app.use('/api/products', products);
  app.use('/api/error', error);
  app.use('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.use('/', htmlFiles);
};
