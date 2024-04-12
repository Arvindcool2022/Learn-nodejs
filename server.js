import express from 'express';
import cors from 'cors';
import EventEmitter from 'events';
import cookieParser from 'cookie-parser';
import { router as subdirRouter } from './routes/subdir.js';
import { router as rootRouter } from './routes/root.js';
import { router as employeesRouter } from './routes/api/employees.route.js';
import { router as registerRouter } from './routes/register.js';
import { router as loginRouter } from './routes/login.js';
import { router as refreshRouter } from './routes/refresh.js';
import { router as logoutRouter } from './routes/logout.js';
import { corsOptions } from './config/cors.config.js';
import logEvent, { emitFunc } from './middleware/logEvents.js';
import errorHandler, { serve404 } from './middleware/errorHandler.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import mongoose from 'mongoose';
import connectToDB from './config/dbConnect.js';
class Emitter extends EventEmitter {}
const emitter = new Emitter();
connectToDB();

const app = express();
const port = process.env.PORT || 1234;
emitter.on('log', (msg, fName) => logEvent(msg, fName));
app.use((req, res, next) => emitFunc(req, res, next, emitter));
app.use(cors(corsOptions));
// app.use(express.urlencoded());
// app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public')); //# middleware for static files
app.use('/', rootRouter);
app.use('/subdir', subdirRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use(verifyJWT);
app.use('/employee(s)?', employeesRouter);
app.all('*', [mid1, mid2, (req, res) => serve404(req, res, emitter)]); //# custom middleware
app.use(errorHandler);
mongoose.connection.once('open', () => {
  console.log('DB Connected');
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});

function mid1(req, res, next) {
  console.log('error logged');
  next();
}
function mid2(req, res, next) {
  console.log('2nd middleware');
  next();
}

//TODO: add credencials middleware, set secure true. (more on TODO before frontend.txt)
