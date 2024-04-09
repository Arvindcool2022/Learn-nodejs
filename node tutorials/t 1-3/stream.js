import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { __dirname, __filename } from './utils.js';

const fPath = name => join(__dirname, 'lib', name);
const rs = createReadStream(fPath('lorem.txt'), { encoding: 'utf-8' });

const ws = createWriteStream(fPath('newLorem.txt'));

// ❌ Bad
// rs.on('data', chuck => {
//   ws.write(chuck);
// });

// ✅ Good
rs.pipe(ws);
