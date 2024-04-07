import { writeFile, readFile, unlink, appendFile, rename } from 'fs/promises';
import { join } from 'path';
import { __dirname } from './utils.js';

const FileOps = async () => {
  try {
    const fPath = name => join(__dirname, 'lib', name);
    await writeFile(fPath('write.txt'), 'Hello There!!!');
    const data = await readFile(fPath('write.txt'), 'utf-8');
    await unlink(fPath('write.txt'));
    console.log(data);
    await writeFile(fPath('DUPLICATE.txt'), data);
    await appendFile(fPath('DUPLICATE.txt'), '\n\nWho are you?');
    await rename(fPath('DUPLICATE.txt'), fPath('newWrite.txt'));
    const newData = await readFile(fPath('newWrite.txt'), 'utf-8');
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};
FileOps();

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
