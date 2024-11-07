import Joi from 'joi';

import User from '../models/user.js';
import response from './../../utils/response.js';
import { uploadHelper } from '../../utils/uploadHelper.js';

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const querySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  page: Joi.number().integer().min(1).default(1),
});

export const getUsers = async (req, res, next) => {
  const { error, value } = querySchema.validate(req.query);
  if (error) {
    return response(res, 400, null, error.details[0].message);
  }

  const { limit, page } = value;
  const skip = (page - 1) * limit;

  try {
    const users = await User.findAll({
      take: limit + 1,
      skip,
    });

    const hasNext = users.length > limit;

    const data = {
      users: users.slice(0, limit),
      pagination: {
        page,
        limit,
        hasNext,
        nextPage: hasNext ? page + 1 : null,
      },
    };

    return response(res, 200, data, null);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return response(res, 404, null, `No user found with id ${id}`);
    }

    return response(res, 200, foundUser, null);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return response(res, 400, null, error.details[0].message);
  }

  try {
    let filePath = null;
    if (req.file) {
      filePath = await uploadHelper(req.file);
    }

    const user = await User.create(req.body);
    const responseJSON = {
      ...user,
      filePath,
    };
    return response(res, 201, responseJSON, null);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { error } = userSchema.validate(req.body);

  if (error) {
    return response(res, 400, null, error.details[0].message);
  }

  try {
    const updatedUser = await User.update(id, req.body);

    return response(res, 200, updatedUser, null);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.delete(id);

    return response(res, 204, null, null);
  } catch (error) {
    next(error);
  }
};
