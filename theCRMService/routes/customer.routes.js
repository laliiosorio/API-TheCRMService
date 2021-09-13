const router = require("express").Router()
const Customer = require('../models/Customer.model')
const { checkLoggedUser } = require('../middleware')


//User profile
router.get('/', checkLoggedUser, (req, res) => {

    const user_id = req.session.currentUser._id

    Customer
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Ha ocurrido un error relacionado con el ususario', err }))
})

//New customer
router.post('/newCustomer', (req, res) => {

    const { mail, name, surname, image } = req.body

    Customer
        .create({ mail, name, surname, image })
        .then(() => res.json({ code: 200, message: 'Customer created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating Customer', err }))
})



//Edit customer
router.put('/edit', checkLoggedUser, (req, res) => {

    const { name, lastName, DNI, phone, image } = req.body
    const user_id = req.session.currentUser._id

    Customer
        .findByIdAndUpdate(user_id, { name, lastName, DNI, phone, image })
        .then(response => { res.json(response) })
        .catch(err => res.status(500).json({ code: 500, message: 'Ha ocurrido un error en la edición del usuario', err }))

})


module.exports = router
