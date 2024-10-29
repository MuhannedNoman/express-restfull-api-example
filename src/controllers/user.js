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

export const getUsers = (req, res, next) => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = (req, res, next) => {
  const { id } = req.params;

  try {
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  try {
    const user = {
      id: users.length + 1,
      name,
      email,
    };

    users.push(user);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = name;
    user.email = email;

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
