const express = require('express')
const Route = express.Router()
const borrowController = require('../controllers/borrow')
const auth = require('../middleware/auth')

Route
    // check authentication

    .get('/', auth.verifyTokenMiddleware, borrowController.getAllBorrowings)
    .get('/:id', auth.verifyTokenMiddleware, borrowController.getOneBorrowings)
    .post('/', auth.verifyTokenMiddleware, borrowController.insertBorrow)
    .patch('/:id', auth.verifyTokenMiddleware, borrowController.returnBorrow)
    .delete('/:id', auth.verifyTokenMiddleware, borrowController.deletedBorrow)

module.exports = Route