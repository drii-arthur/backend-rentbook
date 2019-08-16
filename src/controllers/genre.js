const modelGenre = require('../models/genre')

module.exports = {
    getAllDataGenre: (req, res) => {
        modelGenre.getDataGenre()
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },

    // fuction  for add data genre

    addDataGenre: (req, res) => {
        const data = {

            genre_name: req.body.genre_name
        }
        modelGenre.insertDataGenre(data)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    // function  for edit data genre

    editDataGenre: (req, res) => {
        const id_data = req.params.id_genre
        const data = req.body

        modelGenre.updateDataGenre(data, id_data)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    },

    // this is function for remove genre data

    removeDataGenre: (req, res) => {
        const id_data = req.params.id_data

        modelGenre.deletedDataGenre(id_data)
            .then(result => res.json(result))
            .catch(err => {
                console.log(err)
            })
    }
}