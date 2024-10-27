import user from './user.js';
import products from './products.js';

export default (app) => {
  app.use('/api/users', user);
  app.use('/api/products' ,  products);
};
