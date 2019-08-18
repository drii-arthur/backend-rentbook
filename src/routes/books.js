const express = require('express')
const Route = express.Router()
const productController = require('../controllers/books')
const auth = require('../middleware/auth')

Route

    .get('/book', productController.getAllList)
    .get('/book/:id_books', productController.getDataBookById)
    .post('/book', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.addBookData)
    .patch('/book/:id_books', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.editBookData)
    .delete('/book/:id_books', auth.verifyTokenMiddleware, auth.verifyAdmin, productController.deleteBook)

module.exports = Route