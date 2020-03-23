const express = require('express');
const router = express.Router();
const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');
const store = require('store');

const users = require('../data/users.json').users;

const bcrypt = require('bcrypt');

router
  .get('/', (req, res) => {
    res.render('login');
  })
  .post('/', async (req, res) => {

    const { logemail, logpassword } = req.body;

    let [ user ] = users.filter(user => (user.email === logemail));


    if(!await bcrypt.compare(logpassword, user.password)) {

      // res.status(401).render();
      console.log('You need to register first!!');

      return res.redirect('/registration');

    } else {

      const jwt_token =  jwt.sign(
        user,
        secret);

      store.set('token', jwt_token);

      return res.redirect('/personal')
    }

  });


module.exports = router;