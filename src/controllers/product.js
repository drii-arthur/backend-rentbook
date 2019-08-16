const respons = require('../response/response')
const modelProduct = require('../models/product')

module.exports = {

    getAllList: (req, res) => {
        const keyword = req.query.keyword
        const sort = req.query.sortby
        const status = req.query.status
        const page = req.query.page || 1
        const limit = req.query.limit || 3
        const offset = (page - 1) * limit
        modelProduct.getList(keyword, sort, status, limit, offset)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    // function get data book by id

    getDataBookById: (req, res) => {
        const id_books = req.params.id_books
        modelProduct.getDataById(id_books)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    // this is a function for add data
    addBookData: (req, res) => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: new Date,
            genre: req.body.genre,
            status: req.body.status
        }
        modelProduct.insertNewProduct(data)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },
    // this is a function for edit book data where id
    editBookData: (req, res) => {
        const id_book = req.params.id_books
        const data = req.body
        modelProduct.updateProduct(data, id_book)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },
    deleteBook: (req, res) => {
        const id_book = req.params.id_books
        modelProduct.deletedProduct(id_book)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    }

}