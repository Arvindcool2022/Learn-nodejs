import { existsSync, mkdir, rmdir } from 'fs';

if (!existsSync('./new'))
  mkdir('./new', err => {
    if (err) throw err;
    console.log('mkdir');
  });
else console.log('already exists');

if (existsSync('./new'))
  rmdir('./new', err => {
    if (err) throw err;
    console.log('rmdir');
  });
else console.log('does not exists');
