import logEvent from './logEvents.js';
import path from 'path';

export default (err, _, res, next) => {
  logEvent(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};
export const serve404 = (req, res, emitter) => {
  console.log(req.url, req.method);
  res.status(404);
  if (req.accepts('html'))
    res.sendFile(path.join(process.cwd(), 'public', 'views', '404.html'));
  else if (req.accepts('json'))
    res.json({ error: '404 Not Found', message: '404 Not Found' });
  else res.type('txt').send('404 Not Found');

  emitter.emit('log', `${req.url}\t:${req.method}`, 'errLog.txt');
};
