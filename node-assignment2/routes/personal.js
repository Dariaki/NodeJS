const express = require('express');
const router = express.Router();

const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');

const verifyToken = require('./middleware/verification');


router
  .get('/', verifyToken, (req, res) => {

    jwt.verify(req.token, secret, (error, user) => {
      if (error) {
        return res.send('Authorization failed');

      } else {

        return res.render('personal', {user})
      }
    })

  });


module.exports = router;