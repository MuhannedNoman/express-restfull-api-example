import fs from 'node:fs/promises';

const generateURL = (destination) => {
  return new URL(destination, import.meta.url).pathname;
};

export const createFolderIfNotExist = async (folderName) => {
  const folderURL = generateURL(folderName);

  try {
    await fs.access(folderURL);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(folderURL);
    }
    console.log(error);
  }
};

export const createFileIfNotExist = async (fileName) => {
  const fileURL = generateURL(fileName);

  try {
    await fs.access(fileURL);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(fileURL, '');
    }
    console.log(error);
  }
};

export const writeToFile = async (fileName, data) => {
  try {
    await fs.appendFile(generateURL(fileName), data);
  } catch (error) {
    console.log(error);
  }
};
