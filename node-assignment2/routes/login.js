const express = require('express');
const router = express.Router();
const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');
const store = require('store');

const users = require('../data/users.json');


router
  .get('/', (req, res) => {
    res.render('login');
  })
  .post('/', (req, res) => {

    let { logemail, logpassword } = req.body;

    let [ user ] = users.users.filter(user => (user.email === logemail && user.password === logpassword));

    if(!user) {

      res.status(401).json({status: 'You need to register first'});
      return res.redirect('/registration');

    } else {

      let jwt_token =  jwt.sign(
        user,
        secret);

      store.set('token', jwt_token);

      return res.redirect('/personal')
    }


    // before sending token, checking here if we have such a user in our users.json, if - ask to register
    // if yes - provide user with token and redirect to the personal page


  });


module.exports = router;