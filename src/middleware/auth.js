require('dotenv').config()

module.exports = {
    verifyTokenMiddleware: (req, res, next) => {
        const bearerHeader = req.headers['authorization']
        if (bearerHeader !== undefined) {
            const jwt = require('jsonwebtoken')
            const bearer = bearerHeader.split(' ')
            const token = bearer[1]
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if (decoded) {
                    req.id_user = decoded.id_user
                    req.email = decoded.email
                    req.level = decoded.level
                    next()
                } else {
                    throw new Error(decoded)
                }
            } catch (err) {
                console.error(err)
                res.sendStatus(403)
            }
        } else {
            res.sendStatus(404)
        }
    },

    verifyAdmin: (req, res, next) => {
        if (req.level = 'admin') {
            next()
        } else {
            res.sendStatus(403)
        }
    }
}