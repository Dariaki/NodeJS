const express = require('express');
const router = express.Router();
const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
  console.log('This is LogIn middleware');
  next();
});

let user = {name: 'dariaky@gmail.com', password: 'qwerty123'};

router
  .get('/', (req, res) => {
    res.render('login');
  })
  .post('/', (req, res) => {

    let jwt_token =  jwt.sign(
      user,
      secret);

      res.json({jwt_token});

  });


module.exports = router;