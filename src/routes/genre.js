const express = require('express')
const Route = express.Router()
const genreController = require('../controllers/genre')
const auth = require('../middleware/auth')

Route
    .get('/cat', genreController.getAllDataGenre)
    .post('/cat', auth.verifyTokenMiddleware, auth.verifyAdmin, genreController.addDataGenre)
    .patch('/cat/:id_genre', auth.verifyTokenMiddleware, auth.verifyAdmin, genreController.editDataGenre)
    .delete('/cat/:id_genre', auth.verifyTokenMiddleware, auth.verifyAdmin, genreController.removeDataGenre)

module.exports = Route
