import express from 'express';
import path from 'path';

const router = express.Router();

const indexRoute = '^/$|/index(.html)?';
router.get(indexRoute, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'index.html'));
});
router.post(indexRoute, (req, res) => {
  res.send('<h1>Home post</h1>');
});
router.put(indexRoute, (req, res) => {
  res.send('<h1>Home put</h1>');
});
router.delete(indexRoute, (req, res) => {
  res.send('<h1>Home delete</h1>');
});

router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'new-page.html'));
});
router.get(
  '/old-page(.html)?',
  (req, res, next) => {
    console.log('redirecting'); //# custom middleware
    next();
  },
  (req, res) => {
    res.redirect(301, '/new-page');
  }
);

export { router };
