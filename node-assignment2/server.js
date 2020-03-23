const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initiating App
const app = express();
const port = process.env.port || 3000;

const methodOverride = require('method-override');

// Import Routes
const login = require('./routes/login');
const logout = require('./routes/logout');
const deleteAccount = require('./routes/delete-account');
const registration = require('./routes/registration');
const personal = require('./routes/personal');

app.use(methodOverride('_method'));

// Parsing data from our forms
app.use(bodyParser.urlencoded({extended: true}));

// Serving html with css
app.use('/static', express.static('public'));

// Setting ejs
app.set('view engine', 'ejs');

// Making routes
app.use('/login', login);
app.use('/logout', logout);
app.use('/delete-account', deleteAccount);

app.use('/registration', registration);
app.use('/personal', personal);

// Home Route
app.get('/', (req, res) => {
  res.render('index')
});

app.use("*", (req, res) => {
  res.status(404).render('not-found');
});


// Start Server
app.listen(port, (error) => {
  if (error) {
    console.log('Cannot start servers:', error);
  }
  console.log(`Server is listening on port ${port}...`)
});