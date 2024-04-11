import express from 'express';
import { router as subdirRouter } from './routes/subdir.js';
import { router as rootRouter } from './routes/root.js';
import { router as employeesRouter } from './routes/api/employees.route.js';
import { router as registerRouter } from './routes/register.js';
import { router as loginRouter } from './routes/login.js';
import cors from 'cors';
import EventEmitter from 'events';
import logEvent, { emitFunc } from './middleware/logEvents.js';
import errorHandler, { serve404 } from './middleware/errorHandler.js';
import { corsOptions } from './config/cors.config.js';
import { verifyJWT } from './middleware/verifyJWT.js';
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
app.use('/', rootRouter);
app.use('/subdir', subdirRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use(verifyJWT);
app.use('/employee(s)?', employeesRouter);
app.all('*', [
  errorLogger,
  somethingElse,
  (req, res) => serve404(req, res, emitter),
]); //# custom middleware

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

function errorLogger(req, res, next) {
  console.log('error logged');
  next();
}
function somethingElse(req, res, next) {
  console.log('2nd middleware');
  next();
}
