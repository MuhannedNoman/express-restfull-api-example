const users = [
  {
    id: 1,
    name: 'Jhon Doe',
    email: 'jhon@example.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
  },
  {
    id: 3,
    name: 'Jade Doe',
    email: 'jade@example.com',
  },
];

export const getUsers = (req, res) => {
  return res.status(200).json(users);
};

export const getUserById = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).send(user);
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);

  res.status(201).send(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  console.log(user);

  user.name = name;
  user.email = email;

  res.status(200).send(user);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }

  users.splice(userIndex, 1);

  res.status(204).send();
};
