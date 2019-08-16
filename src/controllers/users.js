const modelUsers = require('../models/users')
const joi = require('joi')

module.exports = {

    getUsers: (req, res) => {
        modelUsers.getDatausers()
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    register: (req, res) => {
        const schema = joi.object().keys({
            username: joi.string().alphanum().min(3).max(30).required(),
            email: joi.string().email({ minDomainAtoms: 2 }),
            password: joi.string().min(6)
        })
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const result = joi.validate(data, schema)
        if (result.error != null) {
            return res.json({ message: 'data is not valid' })

        }
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
    }

}