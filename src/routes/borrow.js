const express = require('express')
const Route = express.Router()
const borrowController = require('../controllers/borrow')

Route
    .get('/:id_books', borrowController.insertBorrow)
    .patch('/:id', borrowController.returnBorrow)
    .delete('/:id', borrowController.deletedBorrow

    )

module.exports = Route