import express from 'express';
import { router as subdirRouter } from './routes/subdir.js';
import { router as rootRouter } from './routes/root.js';
import { router as employeesRouter } from './routes/api/employees.route.js';
import cors from 'cors';
import EventEmitter from 'events';
import logEvent, { emitFunc } from './middleware/logEvents.js';
import errorHandler, { serve404 } from './middleware/errorHandler.js';
import { corsOptions } from './config/cors.config.js';
class Emitter extends EventEmitter {}
const emitter = new Emitter();

const app = express();
const port = process.env.PORT || 1234;
emitter.on('log', (msg, fName) => logEvent(msg, fName));

app.use((req, res, next) => emitFunc(req, res, next, emitter));
app.use(cors(corsOptions));
app.use(express.urlencoded()); //! what do these two does
app.use(express.json()); //! what do these two does
app.use(express.static('./public')); //# middleware for static files
// app.use('/subdir', express.static('./public'));
app.use('/', rootRouter);
app.use('/subdir', subdirRouter);
app.use('/employee(s)?', employeesRouter);

const errorLogger = (req, res, next) => {
  console.log('error logged');
  next();
};
const somethingElse = (req, res, next) => {
  console.log('2nd middleware');
  next();
};

app.all('*', [
  errorLogger,
  somethingElse,
  (req, res) => serve404(req, res, emitter),
]); //# custom middleware

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
