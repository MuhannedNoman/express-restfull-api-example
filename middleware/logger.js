import {
  createFolderIfNotExist,
  createFileIfNotExist,
  writeToFile,
} from '../utils/fs.js';
import { stringify } from '../utils/helper.js';

const logsFolder = '../logs';

createFolderIfNotExist(logsFolder);

createFileIfNotExist(`${logsFolder}/requests.log`);

const logger = (req, res, next) => {
  const { method, url, params, body } = req;

  const timestamp = new Date().toISOString();

  const paramsString = stringify(params);
  const bodyString = stringify(body);

  const logMessage = `[${timestamp}] Method: ${method} - URL: ${url} - Params: ${paramsString} - Body: ${bodyString}\n`;

  writeToFile(`${logsFolder}/requests.log`, logMessage);

  next();
};

export default logger;
