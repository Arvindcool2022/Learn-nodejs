const fsPromise = require('fs/promises');
const path = require('path');

const FileOps = async () => {
  try {
    const fPath = name => path.join(__dirname, 'lib', name);
    await fsPromise.writeFile(fPath('write.txt'), 'Hello There!!!');
    const data = await fsPromise.readFile(fPath('write.txt'), 'utf-8');
    await fsPromise.unlink(fPath('write.txt'));
    console.log(data);
    await fsPromise.writeFile(fPath('DUPLICATE.txt'), data);
    await fsPromise.appendFile(fPath('DUPLICATE.txt'), '\n\nWho are you?');
    await fsPromise.rename(fPath('DUPLICATE.txt'), fPath('newWrite.txt'));
    const newData = await fsPromise.readFile(fPath('newWrite.txt'), 'utf-8');
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
