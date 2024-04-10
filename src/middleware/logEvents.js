import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Utils
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = name => path.join(__dirname, name);
const fPath = (dir, fileName) => path.join(__dirname, dir, fileName);

// Event Func
const logEvent = async (message, logName) => {
  const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
  const logItem = `\n${dateTime}\t${uuid(16)}\t${message}`;
  try {
    if (!existsSync(dirPath('/../logs'))) {
      await mkdir(dirPath('/../logs'));
    }

    await appendFile(fPath('/../logs', logName), logItem);
  } catch (e) {
    console.log(e);
  }
};

export default logEvent;

export const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};
