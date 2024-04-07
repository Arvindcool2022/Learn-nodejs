const fs = require('fs');
const path = require('path');

//Read file
fs.readFile(path.join(__dirname, 'lib', 'write.txt'), 'utf8', (err, data) => {
  if (err) throw err;

  console.log(data); // supposed to say not it
  //Write file
  const Wdata = 'Hello from the other side';
  fs.writeFile(path.join(__dirname, 'lib', 'write.txt'), Wdata, err => {
    if (err) throw err;

    console.error('write Complete');

    //Update file
    const update = 'which side?';
    fs.appendFile(
      path.join(__dirname, 'lib', 'write.txt'),
      '\n' + update,
      err => {
        if (err) throw err;

        console.error('append Complete');

        //Rename file
        fs.rename(
          path.join(__dirname, 'lib', 'write.txt'),
          path.join(__dirname, 'lib', 'written.txt'),
          err => {
            if (err) throw err;

            console.error('Rename Complete');
          }
        );
      }
    );
  });
});

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
