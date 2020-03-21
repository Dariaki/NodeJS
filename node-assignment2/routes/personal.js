const express = require('express');
const router = express.Router();

const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');

const verifyToken = require('./middleware/verification');


router
  .get('/', verifyToken, (req, res) => {

    jwt.verify(req.token, secret, (error, data) => {
      if (error) {
        res.send('Authorization failed');
      } else {
        res.send({data})
      }
    })

  });


module.exports = router;