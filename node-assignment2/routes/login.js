const express = require('express');
const router = express.Router();


router
  .route('/')
  .get((request, response) => {
    response.send('Hello from LogIn page!')
  });


module.exports = router;