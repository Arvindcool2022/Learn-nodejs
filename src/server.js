import express from 'express';

const app = express();
const port = 1234;

app.get('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home</h1>');
});
app.post('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home post</h1>');
});
app.put('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home put</h1>');
});
app.delete('/', (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>Home delete</h1>');
});
app.get('/about', (req, res) => {
  console.log(req.url, req.method);
  res.send('<h1>About Us</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
