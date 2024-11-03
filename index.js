import 'dotenv/config';

import app, { prisma } from './src/app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  try {
    prisma.$connect();
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }

  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log('Database connected');
});
