const store = require('store');

const verifyToken = (req, res, next) => {

  const token = store.get('token');

  if (!token) {
      console.log('You cannot get access to your account');
      res.sendStatus(403);
  } else {

    req.token = token;

  }
  next();

};

module.exports = verifyToken;