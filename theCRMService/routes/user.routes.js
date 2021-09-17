const router = require("express").Router()
const User = require('../models/User.model')
const { checkLoggedUser, checkAdmin } = require('../middleware')
const bcrypt = require("bcrypt")
const bcryptSalt = 10


//All Users
router.get('/', checkLoggedUser, checkAdmin, (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching Users', err }))
})

//New User
router.post('/newUser', checkLoggedUser, checkAdmin, (req, res) => {

    const { mail, pwd, name, lastName, role } = req.body

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
                .create({ mail, password: hashPass, name, lastName, role })
                .then(() => res.json({ code: 200, message: 'User created' }))
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})

//Edit User
router.put('/editUser/:user_id', checkLoggedUser, checkAdmin, (req, res) => {

    const { user_id } = req.params
    const { mail, name, lastName } = req.body
    const query = {}

    mail && (query.mail = mail)
    name && (query.name = name)
    lastName && (query.lastName = lastName)

    User
        .findByIdAndUpdate(user_id, query, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while updating User', err }))
})

//Edit rol User
router.put('/editUserRol/:user_id', checkLoggedUser, checkAdmin, (req, res) => {

    const { user_id } = req.params
    const { rol } = req.body

    User
        .findByIdAndUpdate(user_id, { $set: { role: rol } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while updating User', err }))
})

//Delete User
router.delete('/deleteUser/:user_id', checkLoggedUser, checkAdmin, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndRemove(user_id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error while deleting User', err }))
})



module.exports = router
