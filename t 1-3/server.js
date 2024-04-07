import { add, sub, mul } from './math.js';
import { type, version, release, platform } from 'os';
import { dirname, basename, extname } from 'path';
import { __dirname, __filename } from './utils.js';
const { log } = console;

log(add(1, 1));
log(sub(1, 1));
log(mul(1, 1));
log(type());
log(version());
log(release());
log(platform());

log(__dirname);
log(__filename());

log(dirname(__filename()));
log(basename(__filename()));
log(extname(__filename()));

setTimeout(() => {
  log('tada');
}, 1000);
