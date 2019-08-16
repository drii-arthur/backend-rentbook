const conn = require('../configs/db')

module.exports = {
    getDatausers: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM users', (err, result) => {
                console.log(result)
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    addDataUsers: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT users SET ?', data, (err, result) => {
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

    getUserByEmailAndUsername: (email, username) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE email = '${email}' OR username = '${username}' `, [email, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err => {
                        console.log(err)
                    })
                }
            })
        })
    }
}