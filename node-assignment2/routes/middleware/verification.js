const store = require('store');

const verifyToken = (req, res, next) => {

  const token = store.get('token');

  if (!token) {

      res.sendStatus(403);
  } else {

    req.token = token;

  }
  next();

};

module.exports = verifyToken;