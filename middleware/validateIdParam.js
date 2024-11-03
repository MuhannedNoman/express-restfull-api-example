import Joi from 'joi';

import response from '../utils/response.js';

export default function (req, res, next) {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    return response(res, 400, null, error.details[0].message);
  }

  next();
}
