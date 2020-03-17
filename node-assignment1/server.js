// Use standard http module to implement simple web-server;
// Use fs module to create/modify files in file system;
// Organize all information inside one JSON file;
// Write every request info to array in json file.

const http = require('http');
const fs = require('fs');
const path = require('path');

const requestInfo = {};
requestInfo.logs = [];

fs.writeFile(path.join(__dirname, 'requests.json'), JSON.stringify(requestInfo, null, 4), () => {
  console.log('Json file was created!')
});


http.createServer((request, response) => {

  if(request.url === '/requests') {
    response.writeHead(200, {'Content-type': 'text/json'});
    response.end(JSON.stringify(requestInfo));
  }


  requestInfo.logs.push({
    method: request.method,
    url: request.url,
    time: new Date().getTime()
  });

  fs.writeFile(path.join(__dirname, 'requests.json'), JSON.stringify(requestInfo, null, 4), () => {
    console.log('Json file was updated!')
  });

  response.writeHead(200, {'Content-type': 'text/json'});
  response.end(JSON.stringify({status: 'OK'}));

}).listen(3000, () => {
  console.log('Server is listening on 3000...');
});
