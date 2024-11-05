import { Server } from 'socket.io';

import 'dotenv/config';

import app, { prisma } from './src/app.js';

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  try {
    prisma.$connect();
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }

  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log('Database connected');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg, room) => {
    if (room === '') {
      socket.broadcast.emit('chat message', msg);
    } else {
      io.to(room).emit('chat message', msg);
    }
  });

  socket.on('typing', (msg, room) => {
    if (room === '') {
      socket.broadcast.emit('typing', msg);
    } else {
      io.to(room).emit('typing', msg);
    }
  });
});
