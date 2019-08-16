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

    getBookData: (id_books) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT status FROM  books WHERE id_books = ?', id_books, (err, result) => {
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