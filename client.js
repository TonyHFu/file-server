const net = require('net');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({ 
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log('Server says: ', data);
  if (data === "file ask") {
    rl.resume();
    rl.question("Which file do you want to access?  ", answer => {
      console.log(answer);
      conn.write(answer);
      rl.pause();
    })
  }
});

// conn.on('connect', () => {
//   conn.write('Hello from client!');
// });