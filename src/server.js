import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 1234;
console.log(process.cwd());
app.use(express.static('./public'));

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
    console.log('redirecting'); // middleware
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
};

app.get('/*', [errorLogger, somethingElse, serve404]);
app.listen(port, () => console.log(`Server is running on port ${port}`));
