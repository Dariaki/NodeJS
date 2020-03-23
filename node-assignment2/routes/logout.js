const express = require('express');
const router = express.Router();
const store = require('store');


router
  .delete('/', (req, res) => {

  store.remove('token');

  return res.redirect("/login");
});

module.exports = router;