const express = require('express')
const Route = express.Router()
const productController = require('../controllers/product')

Route

    .get('/book', productController.getAllList)
    .get('/book/:id_books', productController.getDataBookById)
    .post('/book', productController.addBookData)
    .patch('/:id_books', productController.editBookData)
    .delete('/:id_books', productController.deleteBook)

module.exports = Route