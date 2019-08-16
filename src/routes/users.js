const express = require('express')
const Route = express.Router()
const usersControllers = require('../controllers/users')

Route
    .get('/', usersControllers.getUsers)
    .post('/register', usersControllers.register)



module.exports = Route