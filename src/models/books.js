const conn = require('../configs/db')

module.exports = {
    getList: (keyword, sort, status, limit, offset) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id_books, title, description, image, date_released, genre_name AS genre, status, created_at,updated_at
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

    getDataById: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id_books, title, description, image, date_released, genre_name AS genre, status,created_at,updated_at
            FROM books
            inner JOIN genre
            ON genre = id_genre WHERE id_books = ?`, id, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
        })
    },

    getBookYears: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT YEAR(date_released) AS year FROM books GROUP BY year`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })

    },

    getBookByYears: (year) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT books.id_books, books.title, books.description, books.image, books.date_released, books.status, genre.genre_name AS genre FROM books INNER JOIN genre ON books.genre=genre.id_genre WHERE YEAR(books.date_released) = '${year}'`, (err, result) => {
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


    getBookByGenre: (genre) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id_books,title,description, image, genre_name AS genre, status,created_at,updated_at FROM books inner JOIN genre ON genre = id_genre WHERE id_genre = ?`, genre, (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
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
    updateProduct: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE books SET ? where id_books = ?`, [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deletedProduct: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM books WHERE id_books = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}