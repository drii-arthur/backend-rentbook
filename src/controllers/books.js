const modelProduct = require('../models/books')

module.exports = {

    getAllBook: (req, res) => {
        modelProduct.getAllBook()
            .then(result => res.json(result))
            .catch(err => { console.log(err) })
    },

    getAllList: (req, res) => {
        const keyword = req.query.keyword
        const sort = req.query.sortby
        const status = req.query.status
        const page = req.query.page || 1
        const limit = req.query.limit || 8
        const offset = (page - 1) * limit
        modelProduct.getList(keyword, sort, status, limit, offset)
            .then(result => {
                if (result.length != 0) {
                    res.json(result)
                } else {
                    res.json({ message: 'data not pound' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    // function get data book by id

    getDataBookById: (req, res) => {
        const id_books = req.params.id
        modelProduct.getDataById(id_books)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },


    getBookYears: (req, res) => {
        modelProduct.getBookYears()
            .then(result => {
                console.log(result)
                if (result.length !== 0) { res.json(result) }
            })
            .catch(err => {
                console.error(err)
            })
    },

    getBookByYear: (req, res) => {
        modelProduct.getBookByYears(req.params.year)
            .then(result => {
                if (result.length !== 0) { res.json(result) }
            })
            .catch(err => {
                console.error(err)
            })
    },

    getBookByGenre: (req, res) => {
        modelProduct.getBookByGenre(req.params.genre)
            .then(result => {
                if (result.length !== 0) {
                    res.json(result)
                }
                else { res.json("books not pound") }
            })
            .catch(err => {
                console.error(err)
            })
    },

    // this is a function for add data
    addBookData: (req, res) => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date,
            genre: req.body.genre,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        }
        modelProduct.insertNewProduct(data)
            .then(result => res.json({ message: "add successfull" }))
            .catch(err => {
                console.log(err)
            })
    },
    // this is a function for edit book data where id
    editBookData: (req, res) => {
        const id = req.params.id
        const data = req.body
        modelProduct.updateProduct(data, id)
            .then(result => res.json({ message: "updated successfull" }))
            .catch(err => {
                console.log("Login First" + err)
            })
    },
    deleteBook: (req, res) => {
        const id = req.params.id
        modelProduct.deletedProduct(id)
            .then(result => res.json({ message: "delete succesfull" }))
            .catch(err => {
                console.log(err)
            })
    }

}