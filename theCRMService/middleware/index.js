module.exports = {
    checkLoggedUser: (req, res, next) => {
        req.session.currentUser ? next() : res.status(401).json({ code: 401, message: 'Please, log-in' })
    },
    checkAdmin: (req, res, next) => {
        const isAdmin = req.session.currentUser.role === 'admin'
        isAdmin ? next() : res.status(401).res.json({ code: 401, message: "you don't have enough privileges" })
    }
}