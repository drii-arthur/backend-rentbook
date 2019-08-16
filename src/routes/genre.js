const express = require('express')
const Route = express.Router()
const genreController = require('../controllers/genre')

Route
    .get('/cat', genreController.getAllDataGenre)
    .post('/cat', genreController.addDataGenre)
    .patch('/cat/:id_genre', genreController.editDataGenre)
    .delete('/cat/:id_genre', genreController.removeDataGenre)

module.exports = Route
