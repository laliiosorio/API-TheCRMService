const router = require("express").Router()
const Customer = require('../models/Customer.model')
const { checkLoggedUser } = require('../middleware')


//All Customers
router.get('/', checkLoggedUser, (req, res) => {

    Customer
        .find()
        .select('name')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching customers', err }))
})

//New Customer
router.post('/newCustomer', checkLoggedUser, (req, res) => {

    const { mail, name, surname, image } = req.body
    const creatorUser = req.session.currentUser._id


    Customer
        .create({ mail, name, surname, image, creatorUser })
        .then(() => res.json({ code: 200, message: 'Customer created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating Customer', err }))
})

//Edit Customer
router.post('/edit/:customer_id', checkLoggedUser, (req, res) => {

    const { customer_id } = req.params
    const { mail, name, surname, image } = req.body
    const lastUpdateUser = req.session.currentUser._id

    console.log(customer_id)
    console.log(req.body)
    console.log(lastUpdateUser)

    Customer
        .findByIdAndUpdate(customer_id, { mail, name, surname: 'oso', image, lastUpdateUser }, { new: true })
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ code: 500, message: 'DB error while creating Customer', err })
        })
})

//Customer Details
router.get('/:customer_id', checkLoggedUser, (req, res) => {

    const { customer_id } = req.params

    Customer
        .findById(customer_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching customer details', err }))
})


//Delete Customer


module.exports = router
