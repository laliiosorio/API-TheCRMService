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
router.put('/editCustomer/:customer_id', checkLoggedUser, (req, res) => {

    const { customer_id } = req.params
    const { mail, name, surname, image } = req.body
    const lastUpdateUser = req.session.currentUser._id
    const query = { lastUpdateUser }

    mail && (query.mail = mail)
    name && (query.name = name)
    surname && (query.surname = surname)
    image && (query.image = image)

    Customer
        .findByIdAndUpdate(customer_id, query, { new: true })
        .populate('lastUpdateUser')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while updating Customer', err }))
})

//Delete Customer
router.delete('/deleteCustomer/:customer_id', checkLoggedUser, (req, res) => {

    const { customer_id } = req.params

    Customer
        .findByIdAndRemove(customer_id)
        .then(() => res.json({ message: 'Customer deleted successfully' }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error while deleting Customer', err }))
})

//Customer Details
router.get('/:customer_id', checkLoggedUser, (req, res) => {

    const { customer_id } = req.params

    Customer
        .findById(customer_id)
        .populate('lastUpdateUser creatorUser')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching customer details', err }))
})




module.exports = router
