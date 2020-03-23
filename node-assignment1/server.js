// Use standard http module to implement simple web-server;
// Use fs module to create/modify files in file system;
// Organize all information inside one JSON file;
// Write every request info to array in json file.

const util = require('util');
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

http.createServer(async (request, response) => {

  if(request.url === '/requests') {
      response.writeHead(200, {'Content-type': 'application/json'});
      const data = await readFileAsync(path.join(__dirname, 'requests.json'), 'utf-8');

      return response.end(data);
  }

  const data = await readFileAsync(path.join(__dirname, 'requests.json'), 'utf-8');
  const dataParsed = JSON.parse(data);

  const { method, url } = request;

  dataParsed.logs.push({
    method,
    url,
    time: new Date().getTime()
  });

  try {
    await writeFileAsync(path.join(__dirname, 'requests.json'), JSON.stringify(dataParsed, null, 4), 'utf-8');
  } catch(e) {
    console.log('Error happened:', e);
  }

  response.writeHead(200, {'Content-type': 'application/json'});
  return response.end(JSON.stringify({status: 'OK'}));

}).listen(port, () => {
  console.log('Server is listening on 3000...');
});
