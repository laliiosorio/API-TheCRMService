const router = require("express").Router()
const User = require('./../models/User.model')
const bcrypt = require("bcrypt")


// Login
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
  req.session.destroy(() => res.json({ mssage: 'Logout successful' }));
})

router.post('/isloggedIn', (req, res) => {
  req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})


module.exports = router