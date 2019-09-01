const conn = require('../configs/db')

module.exports = {
    borrowBook: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO borrow SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => {
                        console.log(err)
                    })
                }
            })
        })
    },

    getAllBorrowList: (search, sort, status = null, limit, offset) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT id, books.title, users.username, date_transaction, date_return FROM borrow JOIN books ON id_books = books_id JOIN users ON id_user = users_id'
            const bookStatus = status != null
            if (search != null || sort != null || bookStatus) {
                query += ' WHERE'
                query += search ? ` books_id LIKE '${search}'` : ''
                query += search && status ? ' AND' : ''
                query += bookStatus ? ` date_return IS ` : ''
                query += bookStatus && status == 'returned' ? ` NOT NULL` : ''
                query += bookStatus && status == 'borrowed' ? ` NULL` : ''
                query += sort ? ` ORDER BY '${sort}'` : ''
            }
            conn.query(`${query} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => {
                        console.log(err)
                    })
                }
            })

        })

    },

    getOneBorrowings: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, books.title, users_id, users.username, date_transaction, date_return FROM borrow JOIN books ON id_books = books_id JOIN users ON id_user = users_id WHERE books_id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => {
                        console.log(err)
                    })
                }
            })
        })
    },

    getBookData: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT status FROM  books WHERE id_books = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    setBookData: (id_books, status) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE books SET status = ? WHERE id_books = ?', [status, id_books], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getLatestBorrowing: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM borrow WHERE books_id = ? AND date_return IS NULL', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    returnBook: (id, data) => {
        return new Promise((resolve, reject) => {
            console.log(id)
            conn.query('UPDATE borrow SET ? WHERE id = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => {
                        console.log(err)
                    })
                }
            })
        })
    },

    deleteBorrowing: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM borrow WHERE id = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => console.log(err))
                }
            })
        })
    }

}