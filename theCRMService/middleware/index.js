module.exports = {
    checkLoggedUser: (req, res, next) => {
        req.session.currentUser ? next() : res.status(401).json({ code: 401, message: 'Please, log-in' })
    },
    checkAdmin: (req, res, next) => {

        const isAdmin = req.session.currentUser.role === 'admin'
        console.log(isAdmin)
        isAdmin ? next() : res.json({ errorMessage: "you don't have enough privileges" })
    }
}