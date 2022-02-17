const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  // client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text
  client.write("file ask");
  client.on('data', (data) => {
    console.log('Message from client: ', data);
    fs.readFile("./" + data, (err, data) => {
      if (err) {
        console.log("There was an error:", err);
        client.write("There was an error:", err);
        client.write("file ask");
        
      } else {
        client.write(data);
        setTimeout(()=>{client.write("file ask")},1000);
      }
      
      
    })
  });
});
