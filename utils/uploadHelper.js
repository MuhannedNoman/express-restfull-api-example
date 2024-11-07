import fs from 'fs';
import path from 'path';

import { __dirname } from '../src/app.js';

export const uploadHelper = async (file) => {
  const tempPath = file.path;
  const targetPath = path.join(__dirname, 'uploads', file.originalname);

  if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(tempPath);
    const writeStream = fs.createWriteStream(targetPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      fs.unlink(tempPath, (err) => {
        if (err) {
          console.log(err);
          return reject('Error processing file');
        }
        resolve(targetPath);
      });
    });

    writeStream.on('error', (err) => {
      console.log(err);
      reject('Error processing file');
    });
  });
};
