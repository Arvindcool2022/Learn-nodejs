const fs = require('fs');

if (!fs.existsSync('./new'))
  fs.mkdir('./new', err => {
    if (err) throw err;
    console.log('mkdir');
  });
else console.log('already exists');

if (fs.existsSync('./new'))
  fs.rmdir('./new', err => {
    if (err) throw err;
    console.log('rmdir');
  });
else console.log('does not exists');
