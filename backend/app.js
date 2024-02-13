const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser')
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const mongoose = require('mongoose')
const HttpError = require('./models/http-error')
const cookieParser = require("cookie-parser");
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()
const multer = require('multer');

app.use(cors({
    credentials: true,
    origin: ['https://places-app-new.vercel.app'],
    // origin: true
}))

app.use(bodyParser.json())
app.use(cookieParser());

// app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use('/api/places', placesRoutes)

app.use('/api/users', usersRoutes)

// app.use('/', (req, res) => {
//     res.send('server is running')
// })

app.use((req, res, next) => {
    const error = new HttpError('This route could not be found', 404)
    throw error;
})

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error accured' })
})

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vdxgsrs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
).then(() => {
    app.listen(process.env.PORT || 5050)
    console.log('MongoDB is connected!')
}
).catch(err => {
    console.log(err);
})
