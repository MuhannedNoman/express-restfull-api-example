import { prisma } from '../app.js';

const user = {
  create: async (data) => {
    return await prisma.user.create({
      data: {
        ...data,
      },
    });
  },
  findAll: async (options = {}) => {
    return await prisma.user.findMany(options);
  },
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  },
  update: async (id, data) => {
    return await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...data,
      },
    });
  },
  delete: async (id) => {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
};

export default user;
