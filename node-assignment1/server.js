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

http.createServer((request, response) => {

  if(request.url === '/requests') {
      response.writeHead(200, {'Content-type': 'text/json'});

    requestAll().then((result) => {
      response.end(result);
    })

  }

  requestsManager(request).then(() => {
    response.writeHead(200, {'Content-type': 'application/json'});
    return response.end(JSON.stringify({status: 'OK'}));

  })


}).listen(port, () => {
  console.log('Server is listening on 3000...');
});


async function requestAll() {
  return await readFileAsync(path.join(__dirname, 'requests.json'), 'utf-8');
}

async function requestsManager(req) {
  const data = await readFileAsync(path.join(__dirname, 'requests.json'), 'utf-8');

  const dataParsed = JSON.parse(data);
  dataParsed.logs.push({
    method: req.method,
    url: req.url,
    time: new Date().getTime()
  });

  return await writeFileAsync(path.join(__dirname, 'requests.json'), JSON.stringify(dataParsed, null, 4), 'utf-8');

}
