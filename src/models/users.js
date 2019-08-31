const conn = require('../configs/db')

module.exports = {

    // this is query for adding new users

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

    // this is query for get user data where email and username,this is use for check if user data already exist

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
    },

    login: (email, password) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, result) => {
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

    getUserByid: (id) => {
        return new Promise((resolve,reject) => {
            conn.query(`SELECT * FROM users WHERE id_user = ?`,id,(err,result) => {
                if(!err){
                    resolve(result)
                }else{
                    reject(err => {
                        console.log(err)
                    })
                }
            })
        })
    },


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


}