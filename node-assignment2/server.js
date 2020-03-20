const express = require('express');

// Init App
const app = express();
const port = process.env.port || 3000;

// Home Route
app.get('/', (request, response) => {
  response.send('Hello world!')
});

app.get('/sweethome', (request, response) => {
  response.render('<h1>Sweet home alabama!</h1>')
});

// Start Server
app.listen(port, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${port}...`)
});