const conn = require('../configs/db')

module.exports = {
    getList: (keyword, sort, status, limit, offset) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id_books, title, description, image, date_released, genre_name AS genre, status, created_at,update_at
            FROM books
            inner JOIN genre
            ON genre = id_genre`

            if (keyword != null || sort != null || status != null) {
                query += keyword || status ? ` WHERE` : ''
                query += status ? ` status = ${status}` : ''
                query += keyword && status ? ` AND` : ''
                query += keyword ? ` title LIKE '%${keyword}%'` : ''
                query += sort ? ` ORDER BY ${sort}` : ''
            }
            conn.query(`${query} LIMIT ${limit} OFFSET ${offset} `, (err, result) => {
                console.log(query)
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

    // function get data by id

    getDataById: (id_books) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id_books, title, description, image, date_released, genre_name AS genre, status
            FROM books
            inner JOIN genre
            ON genre = id_genre WHERE id_books = ?`, id_books, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
        })
    },

    insertNewProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT books SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateProduct: (data, id_book) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE books SET ? where id_books = ?`, [data, id_book], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deletedProduct: (id_book) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM books WHERE id_books = ?', id_book, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}