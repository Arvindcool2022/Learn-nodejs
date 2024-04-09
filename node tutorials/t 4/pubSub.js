import { EventEmitter } from 'events';

// Create an event emitter instance
const eventEmitter = new EventEmitter();

// Subscriber function
const subscriber = message => {
  console.log('Received message:', message);
  eventEmitter.off('message', subscriber);
  console.log('not Listening anymore (Unsubcribed)');
};

// Subscribe to an event
eventEmitter.on('message', subscriber);

// Publisher function
const publisher = message => {
  // Emit the message event
  console.log('Publishing a message in 5 sec:', message);
  setTimeout(() => {
    console.log('Published');
    eventEmitter.emit('message', message);
  }, 5000);
};

export { publisher, subscriber };
// Publish a message
// publisher('Hello, world!');

// Unsubscribe from the event
// eventEmitter.off('message', subscriber);
