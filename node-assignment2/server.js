const express = require('express');

// Init App
const app = express();
const port = process.env.port || 3000;

const login = require('./routes/login');
const personal = require('./routes/personal');

app.set('view engine', 'ejs');
app.use('/login', login);
app.use('/personal', personal);

// Home Route
app.get('/', (req, res) => {
  res.render('index')
});



// Start Server
app.listen(port, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${port}...`)
});