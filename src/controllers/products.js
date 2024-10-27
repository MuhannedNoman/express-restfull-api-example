const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
  },
];

export const getProducts = (req, res) => {
  return res.status(200).json(products);
};

export const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.status(200).send(product);
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;
  const product = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(product);

  res.status(201).send(product);
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return res.status(404).send('Product not found');
  }

  product.name = name;
  product.price = price;

  res.status(200).send(product);
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  products.splice(productIndex, 1);

  res.status(204).send();
};
