// TOKEN FORMAT:
// Authorization: Bearer <access_token>


const verifyToken = (req, res, next) => {
  // Get authorization header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader === 'undefined') {
      res.sendStatus(403);
  } else {
    let bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

  }
  next();

};

module.exports = verifyToken;