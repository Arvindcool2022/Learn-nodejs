import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';
import EventEmitter from 'events';
import logEvent from './middleware/logEvents.js';
class Emitter extends EventEmitter {}
const emitter = new Emitter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 1234;
const whiteList = [
  'https://www.sitename.com',
  'http://127.0.0.1:5173',
  'https://localhost:1234',
];
console.log('process: ', process.cwd());
console.log('__dirname: ', __dirname);
emitter.on('log', (msg, fName) => logEvent(msg, fName));

app.use((req, res, next) => {
  console.log('logger: ', req.headers.origin, req.url, req.method);
  emitter.emit('log', `${req.url}\t:${req.method}`, 'reqLog.txt');
  next();
});
app.use(cors(whiteList));
app.use(express.urlencoded()); //! what do these two does
app.use(express.json()); //! what do these two does
app.use(express.static('./public')); //# middleware for static files

const indexRoute = '^/$|/index.html';
app.get(indexRoute, (req, res) => {
  console.log(req.url, req.method);
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'index.html'));
});
app.post(indexRoute, (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home post</h1>');
});
app.put(indexRoute, (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home put</h1>');
});
app.delete(indexRoute, (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home delete</h1>');
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'new-page.html'));
});
app.get(
  '/old-page(.html)?',
  (req, res, next) => {
    console.log('redirecting'); //# custom middleware
    next();
  },
  (req, res) => {
    res.redirect(301, '/new-page');
  }
);

const errorLogger = (req, res, next) => {
  console.log('error logged');
  next();
};
const somethingElse = (req, res, next) => {
  console.log('2nd middleware');
  next();
};
const serve404 = (req, res) => {
  res
    .status(404)
    .sendFile(path.join(process.cwd(), 'public', 'views', '404.html'));
  emitter.emit('log', `${req.url}\t:${req.method}`, 'errLog.txt');
};

app.get('/*', [errorLogger, somethingElse, serve404]); //# custom middleware
app.listen(port, () => console.log(`Server is running on port ${port}`));
