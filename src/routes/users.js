const express = require('express')
const Route = express.Router()
const auth = require('../middleware/auth')
const usersControllers = require('../controllers/users')

Route
    .get('/', usersControllers.getUsers)
    .post('/admin/register', auth.verifyTokenMiddleware, auth.verifyAdmin, usersControllers.registerAdmin)
    .post('/register', usersControllers.registerUsers)
    .post('/login', usersControllers.login)



module.exports = Route