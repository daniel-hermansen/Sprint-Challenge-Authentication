const router = require('express').Router();
const Users = require('./auth-model.js')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

router.post('/Register', async (req, res) => {
  const user = req.body
  const hash = bcryptjs.hashSync(user.password, 10)
  user.password = hash
  try {
      const newUser = await Users.addUser(user)
      if (newUser) {
          res.status(201).json('New User added')

      } else {
          res.status(404).json('Unable to add new User')
      }
  }
  catch{
      res.status(500).json('Error with Database')
  }
})

router.post('/Login', async (req, res) => {
  let { username, password } = req.body;
  try {
      const user = await Users.findBy({ username }).first()
      if (user && bcryptjs.compareSync(password, user.password)) {
         
          const token = generateToken(user)
          res.status(200).json({ message: `Welcome ${user.username}`, token })
      } else {
          res.status(401).json({ message: 'Invalid Credentials' })
      }
  }
  catch (error) {
      res.status(500).json(error)
  }
})


function generateToken(user) {
  const payload = {
      username: user.username
  }

  const secret = process.env.JWT_SECRET || 'is it safe';
  const options = {
      expiresIn: "2h"
  };

  return jwt.sign(payload, secret, options)
}

module.exports = router;
