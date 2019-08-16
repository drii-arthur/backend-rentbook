const modelBorrower = require('../models/borrow')


module.exports = {
    insertBorrow: (req, res) => {
        const data = {
            books_id: req.params.id_books,
            date_transaction: new Date()

        }
        modelBorrower.getBookData(data.books_id)
            .then(result => {
                if (result[0].status == 1) {
                    return Promise.all([
                        modelBorrower.borrowBook(data),
                        modelBorrower.setBookData(data.books_id, 0)
                    ])
                        .then(result => res.json(result))
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
            .then(result => res.json(result))
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