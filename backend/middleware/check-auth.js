const HttpError = require('../models/http-error')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1]; // Autherization: 'Bearer TOKEN'
        // console.log(req.headers.authorization);
        if (!token) {
            throw new HttpError('Authontization failed. Token missing', 403)
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.userData = {
            userId: decodedToken.userId
        }
        next()
    } catch (err) {
        const error = new HttpError('Authentication failed', 401)
        console.log(err);
        return next(error)
    }
}