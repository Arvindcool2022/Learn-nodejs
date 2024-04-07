const { add, sub, mul } = require('./math');
const { type, version, release, platform } = require('os');
const { dirname, basename, extname } = require('path');
const { log } = console;

log(add(1, 1));
log(sub(1, 1));
log(mul(1, 1));
log(type());
log(version());
log(release());
log(platform());

log(__dirname);
log(__filename);

log(dirname(__filename));
log(basename(__filename));
log(extname(__filename));

setTimeout(() => {
  log('tada');
}, 1000);
