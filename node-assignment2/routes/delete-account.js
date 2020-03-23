const express = require('express');
const router = express.Router();
const store = require('store');

const users = require('../data/users.json').users;

router
  .delete('/', (req, res) => {

    store.remove('token');

    return res.redirect("/register");
  });

module.exports = router;