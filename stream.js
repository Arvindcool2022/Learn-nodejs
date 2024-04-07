const fs = require('fs');
const path = require('path');

const fPath = name => path.join(__dirname, 'lib', name);
const rs = fs.createReadStream(fPath('lorem.txt'), { encoding: 'utf-8' });

const ws = fs.createWriteStream(fPath('newLorem.txt'));

// ❌ Bad
// rs.on('data', chuck => {
//   ws.write(chuck);
// });

// ✅ Good
rs.pipe(ws);
