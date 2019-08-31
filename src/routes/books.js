const express = require('express')
const Route = express.Router()
const productController = require('../controllers/books')
const auth = require('../middleware/auth')

Route

    .get('/book', productController.getAllList)
    .post('/book', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.addBookData)
    .patch('/book/:id', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.editBookData)
    .delete('/book/:id', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.deleteBook)
    .get('/book/year/', productController.getBookYears)
    .get('/book/year/:year', productController.getBookByYear)
    .get('/book/genre/:genre', productController.getBookByGenre)
    .get('/book/:id', productController.getDataBookById)

module.exports = Route