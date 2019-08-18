const modelBorrower = require('../models/borrow')


module.exports = {

    getAllBorrowings: (req, res) => {
        const search = req.query.search
        const sort = req.query.sort
        const status = req.query.status
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const offset = (Number(page) - 1) * limit
        modelBorrower.getAllBorrowList(search, sort, status, limit, offset)
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },

    getOneBorrowings: (req, res) => {
        const id = req.params.id
        modelBorrower.getOneBorrowings(id)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    insertBorrow: (req, res) => {
        const data = {
            users_id: req.body.id_user,
            books_id: req.body.id_book,
            date_transaction: new Date()

        }
        modelBorrower.getBookData(data.books_id)
            .then(result => {
                if (result[0].status === 1) {
                    return Promise.all([
                        modelBorrower.borrowBook(data),
                        modelBorrower.setBookData(data.books_id, 0)
                    ])
                        .then(result => res.json({ message: 'rent book success' }))
                } else {
                    res.json({ message: "Book Not Available" })
                }
            })
            .catch(err => {
                console.log(err)
            })

    },
    returnBorrow: (req, res) => {
        const data = {
            books_id: req.params.id,
            date_return: new Date()
        }
        const id = req.params.id
        modelBorrower.getLatestBorrowing(id)
            .then(result => {
                console.log(result)
                return Promise.all([
                    modelBorrower.returnBook(result[0].id, data),
                    modelBorrower.setBookData(data.books_id, 1)
                ])
            })
            .catch(err => {
                console.log(err)
            })
            .then(result => res.json({ message: 'returning book success' }))
    },

    deletedBorrow: (req, res) => {
        const id = req.params.id
        modelBorrower.deleteBorrowing(id)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    }
}