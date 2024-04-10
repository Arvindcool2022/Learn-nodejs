import logEvent from './logEvents.js';

export default (err, _, res, next) => {
  logEvent(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};
