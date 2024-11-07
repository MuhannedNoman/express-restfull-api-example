import { Router } from 'express';
import { join } from 'node:path';

import { __dirname } from '../app.js';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

router.get('/upload', (req, res) => {
  res.send(`
    <form action="/api/users" method="post" enctype="multipart/form-data">
    <label for="file">Choose a file:</label>
    <input type="file" name="file" id="file">
    <br>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
    <br>
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
    <br>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password">
    <br>
    <button type="submit">Submit</button>
    </form>
    `);
});

export default router;
