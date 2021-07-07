/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const {authorization} = req.headers;

    if (authorization) {
      const secret = process.env.JWT_SECRET || 'is it safe';
      jwt.verify(authorization, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: 'There has been an error' })
        } else {
          req.token = decodedToken
          next();
        }
      })
    } else {
      res.json({ message: 'Invalid username or password' })
    }
  }
  catch  {
    res.status(401).json({ message: 'Please Login' })
  }
}