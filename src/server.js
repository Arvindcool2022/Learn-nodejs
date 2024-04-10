import express from 'express';
import { router as subdirRouter } from './routes/subdir.js';
import { router as rootRouter } from './routes/root.js';
import { router as employeesRouter } from './routes/api/employees.js';
import cors from 'cors';
import path from 'path';
import EventEmitter from 'events';
import logEvent from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
class Emitter extends EventEmitter {}
const emitter = new Emitter();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 1234;
const whitelist = [
  'https://www.google.com',
  'http://127.0.0.1:5500',
  'http://localhost:1234'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
emitter.on('log', (msg, fName) => logEvent(msg, fName));

app.use((req, res, next) => {
  console.log('logger: ', req.headers.origin, req.url, req.method);
  emitter.emit('log', `${req.url}\t:${req.method}`, 'reqLog.txt');
  next();
});
app.use(cors(corsOptions));
app.use(express.urlencoded()); //! what do these two does
app.use(express.json()); //! what do these two does
app.use(express.static('./public')); //# middleware for static files
// app.use('/subdir', express.static('./public'));
app.use('/', rootRouter);
app.use('/subdir', subdirRouter);
app.use('/employees', employeesRouter);

const errorLogger = (req, res, next) => {
  console.log('error logged');
  next();
};
const somethingElse = (req, res, next) => {
  console.log('2nd middleware');
  next();
};
const serve404 = (req, res) => {
  console.log(req.url, req.method);
  res.status(404);
  if (req.accepts('html'))
    res.sendFile(path.join(process.cwd(), 'public', 'views', '404.html'));
  else if (req.accepts('json'))
    res.json({ error: '404 Not Found', message: '404 Not Found' });
  else res.type('txt').send('404 Not Found');

  emitter.emit('log', `${req.url}\t:${req.method}`, 'errLog.txt');
};
app.all('*', [errorLogger, somethingElse, serve404]); //# custom middleware

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
