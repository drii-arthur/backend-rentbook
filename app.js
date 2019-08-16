require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT || 8081
const bodyParser = require('body-parser')
const logger = require('morgan')
const bookRoute = require('./src/routes/product')
const genreRoute = require('./src/routes/genre')
const borrowRoute = require('./src/routes/borrow')
const userRoute = require('./src/routes/users')


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

app.use('/', bookRoute)
app.use('/genre', genreRoute)
app.use('/borrow', borrowRoute)
app.use('/users', userRoute)

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })



