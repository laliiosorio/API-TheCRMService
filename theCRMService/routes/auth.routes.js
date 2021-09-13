const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const User = require('./../models/User.model')


// Signup (post)
router.post('/signup', (req, res) => {

  const { mail, pwd, name } = req.body

  User
    .findOne({ mail })
    .then(user => {

      if (user) {
        res.status(400).json({ code: 400, message: 'User already exists' })
        return
      }

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(pwd, salt)

      User
        .create({ mail, password: hashPass, name })
        .then(response => {
          return Wallet.create({ user: response.id })
        })
        .then(() => res.json({ code: 200, message: 'User created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err }))
    })
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})


// Login (post)
router.post('/login', (req, res) => {

  const { mail, pwd } = req.body

  User
    .findOne({ mail })
    .then(user => {

      if (!user) {
        res.status(401).json({ code: 401, message: 'User not registered' })
        return
      }

      if (bcrypt.compareSync(pwd, user.password) === false) {
        res.status(401).json({ code: 401, message: 'Incorect password' })
        return
      }

      req.session.currentUser = user
      res.json(req.session.currentUser)
    })
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})


router.get('/logout', (req, res) => {
  req.session.destroy((err) => res.json({ mssage: 'Logout successful' }));
})

router.post('/isloggedIn', (req, res) => {
  req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})


module.exports = router