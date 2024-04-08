import http from 'http';
import { dirname, join, extname, parse } from 'path';
import fs from 'fs';
import fsPromise from 'fs/promises';
import logEvent from './logEvents.js';
import _EventEmitter from 'events';
import { fileURLToPath } from 'url';
class Emitter extends _EventEmitter {}
const emitter = new Emitter();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 1234;
emitter.on('log', (msg, fName) => logEvent(msg, fName));

const serveFile = async (filePath, contentType, response) => {
  try {
    const encoding = contentType.includes('image') ? '' : 'utf8';
    const rawData = await fsPromise.readFile(filePath, encoding);
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;
    const statuscode = filePath.includes('404.html') ? 404 : 200;
    response.writeHead(statuscode, { 'Content-Type': contentType });
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    emitter.emit('log', `${error.name}\t:${error.message}`, 'errLog.txt');
    response.statuscode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
  const extension = extname(req.url);
  const extensionContentTypeMapping = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.txt': 'text/plain',
  };

  const contentType = extensionContentTypeMapping[extension] || 'text/html';
  const textCont = contentType === 'text/html';
  let filePath =
    textCont && req.url === '/'
      ? join(__dirname, 'views', 'index.html')
      : textCont && req.url.slice(-1) === '/'
      ? join(__dirname, 'views', req.url, 'index.html')
      : textCont
      ? join(__dirname, 'views', req.url)
      : join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
