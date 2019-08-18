require('dotenv').config()
const modelUsers = require('../models/users')
const joi = require('joi')
const isFormValidate = (data) => {
    const schema = joi.object().keys({
        username: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string().min(6),
        level: joi.string()
    })
    const result = joi.validate(data, schema)
    if (result.error == null) {
        return true
    } else {
        return false
    }
}
const hash = (string) => {
    crypto = require('crypto-js')
    return crypto.SHA256(string)
        .toString(crypto.enc.Hex)
}

module.exports = {

    getUsers: (req, res) => {
        modelUsers.getDatausers()
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    registerUsers: (req, res) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            level: 'regular'
        }
        // const result = joi.validate(data, schema)
        if (!isFormValidate(data)) {
            return res.json({ message: 'data is not valid' })
        }
        data.password = hash(data.password)
        modelUsers.getUserByEmailAndUsername(data.email, data.username)
            .then(result => {
                if (result.length == 0) {
                    return modelUsers.addDataUsers(data)
                } else {
                    return res.json({ message: 'username or email is already exist' })
                }
            })
            .catch(err => {
                console.error(err)
            })
            .then(result => res.json(result))
    },

    registerAdmin: (req, res) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            level: 'admin'
        }
        if (!isFormValidate(data)) {
            return res.json({ message: 'data is not valid' })
        }
        data.password = hash(data.password)

        modelUsers.getUserByEmailAndUsername(data.email, data.username)
            .then(result => {
                if (result.length == 0) {
                    return modelUsers.addDataUsers(data)
                } else {
                    return res.json({ message: 'username or password already exist' })
                }
            })
            .catch(err => {
                console.error(err)
            })
            .then(result => res.json(result))
    },


    login: (req, res) => {
        const email = req.body.email
        const hashedPassword = hash(req.body.password)
        modelUsers.login(email, hashedPassword)
            .then(result => {
                if (result.length !== 0) {
                    const jwt = require('jsonwebtoken')
                    console.log(result[0])
                    const payload = {
                        id_user: result[0].id_user,
                        email: result[0].email,
                        level: result[0].level
                    }
                    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                        if (err) {
                            console.log(err)
                        }
                        res.json({ token: `bearer ${token}` })
                        console.log(token)
                    })
                } else {
                    return res.json({ message: 'email or password wrong' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

}