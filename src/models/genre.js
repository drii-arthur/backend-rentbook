const conn = require('../configs/db')


module.exports = {
    getDataGenre: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM genre', (err, result) => {
                console.log(result)
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    // function for add new data genre

    insertDataGenre: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO genre SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    // function for edit data genre by id

    updateDataGenre: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE genre SET ? WHERE id_genre = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    // function for delete  data genre by id

    deletedDataGenre: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM genre WHERE id_genre = ?', id, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}