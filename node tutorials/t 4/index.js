import _EventEmitter from 'events';
class Emitter extends _EventEmitter {}
const emitter = new Emitter();
//# ⬆ as per DOCS. I know, WTF

import { logEvent } from './logEvents.js';
import { publisher, subscriber } from './pubSub.js';

emitter.on('log', logEvent);
console.log('Listening for a message (Subscribed)');
emitter.on('message', subscriber);

(() => {
  let count = 0;
  const ID = setInterval(() => {
    emitter.emit('log', `logEvent:${++count}`);
    console.log('logEvent: ', count);
    if (count >= 10) {
      clearInterval(ID);
      publisher('Hello, world!');
    }
  }, 1000);
})();
