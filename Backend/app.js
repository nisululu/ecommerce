const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')

const errorMiddleware = require('./middleware/error')

//config
dotenv.config({ path: 'backend/config/config.env' })

//Route Imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

app.use(express.json()) //body parser for request body undefined
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ limit: 1024 * 1024 * 20 }));
// app.use(bodyParser.urlencoded({
//     limit: 1024 * 1024 * 20,
//     extended: true,
// }));
app.use(fileUpload())

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

//middleware for Errors
app.use(errorMiddleware)

module.exports = app