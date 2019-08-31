const express = require('express')
const Route = express.Router()
const auth = require('../middleware/auth')
const usersControllers = require('../controllers/users')

Route
    .get('/', usersControllers.getUsers)
    .get('/profile', auth.verifyTokenMiddleware, usersControllers.getProfile)
    .post('/admin/register', auth.verifyTokenMiddleware, auth.verifyAdmin, usersControllers.registerAdmin)
    .post('/register', usersControllers.registerUsers)
    .post('/login', usersControllers.login)
    .get('/:id', auth.verifyAdmin, auth.verifyTokenMiddleware, usersControllers.getUserById)



module.exports = Route